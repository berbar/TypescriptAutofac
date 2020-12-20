

namespace iberbar.Autofac.Activators.Reflection
{
    class CTypeComparer implements System.Collections.Generic.IEqualityComparer< System.Reflection.CType >
    {
        public Equals( a: System.Reflection.CType, b: System.Reflection.CType ): boolean
        {
            return a.IsEquivalentTo( b );
        }
    }

    export class CAutowiringPropertyInjector
    {
        private static InjectableProperties: System.Collections.Generic.IDictionary< System.Reflection.CType, System.Reflection.CPropertyInfo[] > = new System.Collections.Generic.CDictionary( { comparer: new CTypeComparer() } );

        /**
         * 
         * @param context 
         * @param instance 
         * @param propertySelector 
         * @param parameters 注意，此处的参数列表是Resolve时传入的
         */
        public static InjectProperties(
            context: IComponentContext,
            instance: object,
            propertySelector: Core.IPropertySelector,
            parameters: ReadonlyArray<Core.CParameter> ): void
        {
            let type = instance.GetType();
            let injectableProperties = this.InjectableProperties.Get( type );
            if ( injectableProperties == null )
            {
                this.InjectableProperties.Add( type, injectableProperties = this.GetInjectableProperties( type ) );
            }

            for ( let i = 0; i < injectableProperties.length; i ++ )
            {
                let propertyInfo = injectableProperties[ i ];
                if ( propertySelector.InjectProperty( propertyInfo, instance ) == false )
                    continue;

                // let setParameter = propertyInfo.GetSetMethod().GetParameters()[ 0 ];
                // let parameter = parameters.FirstOrDefault( ( p ) => p.CanSupplyValue( setParameter, context ).ret == true );
                // if ( parameter != null )
                // {
                // }

                let registration: Core.IComponentRegistration;

                if ( propertyInfo.GetCustomAttributeOne( System.Reflection.TypeOf( CInjectLifetimeScopeAttribute ) ) != null )
                {
                    registration = context.ComponentRegistry.GetRegistration( new Core.CLifetimeScopeService() );
                    if ( registration == null )
                        throw new Error( `Can't resolve the instance of type (ILifetimeScope)` );
                }
                else
                {
                    let propertyType = propertyInfo.PropertyType;
                    if ( propertyType == null )
                        continue;
    
                    let propertyService = new Core.CTypedService( propertyType );
                    registration = context.ComponentRegistry.GetRegistration( propertyService );
                    if ( registration == null )
                        continue;
                }

                let propertyValue: object = null;
                try
                {
                    propertyValue = context.ResolveComponent( registration, [] );
                }
                catch ( e )
                {
                    console.error( e );
                }
                propertyInfo.SetValue( instance, propertyValue );
            }
        }

        private static GetInjectableProperties( instanceType: System.Reflection.CType ): System.Reflection.CPropertyInfo[]
        {
            let injectableProperties = [];
            let properties = instanceType.GetProperties();
            for ( let i = 0; i < properties.length; i ++ )
            {
                let pi = properties[ i ];
                if ( pi.CanWrite == false )
                    continue;
                injectableProperties.push( pi );
            }
            return injectableProperties;
        }

        //private static InstanceTypeNamedParameter: string = "Autofac.AutowiringPropertyInjector.InstanceType";
    }
}
