
/// <reference path="../CInstanceActivator.ts" />


namespace iberbar.Autofac.Activators.Reflection
{
    /**
     * Uses reflection to activate instances of a type.
     */
    export class CReflectionActivator extends CInstanceActivator
    {
        private readonly m_implementationType: System.Reflection.CType = null;

        private readonly m_configuredProperties: ReadonlyArray< Core.CParameter > = null;

        private readonly m_defaultParameters: ReadonlyArray< Core.CParameter > = null ;

        private readonly m_constructor: System.Reflection.CConstructorInfo = null;

        constructor(
            implementationType: System.Reflection.CType,
            configuredParameters: ReadonlyArray< Core.CParameter >,
            configuredProperties: ReadonlyArray< Core.CParameter >
        )
        {
            super( implementationType );
            this.m_implementationType = implementationType;
            this.m_constructor = this.m_implementationType.GetConstructor();

            this.m_defaultParameters = configuredParameters.concat( [
                new CAutowiringParameter(),
                new CDefaultValueParameter()
            ] );
            this.m_configuredProperties = configuredProperties;
        }

        ActivateInstance(context: IComponentContext, parameters?: any[]): object
        {
            let binding = this.GetConstructorBinding( context, parameters );
            if ( binding.CanInstantiate == false )
            {
                throw new Error();
            }
            let instance = binding.Instantiate();
            // let instance: object = null;
            // let constructorParameters = this.m_constructor.GetParameters();
            // if ( constructorParameters.length > 0 )
            // {
            //     let values = Array< object >( constructorParameters.length );
            //     for ( let i = 0; i < constructorParameters.length; i ++ )
            //     {
            //         const cp = constructorParameters[ i ];
            //         let typeAttribute = cp.GetCustomAttributeOne( System.Reflection.TypeOf( System.Reflection.CDeclaringTypeAttribute ) );
            //         if ( typeAttribute == null )
            //         {
            //             values[ i ] = null;
            //         }
            //         else
            //         {

            //         }
            //     }
            // }
            // else
            // {
            //     instance = this.m_constructor.Invoke();
            // }
            this.InjectProperties( instance, context );
            return instance;
        }

        Dispose(): void
        {
            throw new Error("Method not implemented.");
        }

        private GetConstructorBinding( context: IComponentContext, parameters: Core.CParameter[] ): CConstructorParameterBinding
        {
            let prioritisedParameters: Core.CParameter[] = [];
            if ( parameters != null && parameters.length > 0 )
                prioritisedParameters = parameters;
            if ( this.m_defaultParameters != null && this.m_defaultParameters.length > 0 )
                prioritisedParameters = prioritisedParameters.concat( this.m_defaultParameters );

            let binding = new CConstructorParameterBinding( this.m_constructor, prioritisedParameters, context );

            return binding;
        }

        private InjectProperties( instance: object, context: IComponentContext ): void
        {
            if ( this.m_configuredProperties.length == 0 )
                return;

            let actualProperties = instance.GetType().GetProperties().where( ( pi ) => pi.CanWrite );
            for ( const configuredProperty of this.m_configuredProperties )
            {
                for ( let i = 0; i < actualProperties.length; i ++ )
                {
                    let propertyInfo = actualProperties[ i ];
                    let setter = propertyInfo.GetSetMethod();
                    let canSupplyValue = configuredProperty.CanSupplyValue( setter.GetParameters()[ 0 ], context );
                    if ( canSupplyValue.ret == true )
                    {
                        actualProperties.splice( i, 1 );
                        propertyInfo.SetValue( instance, canSupplyValue.valueProvider );
                        break;
                    }
                }
            }
        }
    }
}