

namespace iberbar.MVC.Core
{
    export class CDefaultMapper implements CMapper, System.Collections.Generic.IEqualityComparer< System.Reflection.CType >
    {

        private m_componentKernelType: System.Reflection.CType<Core.CComponentKernel<any>> = null;
        private m_componentTypes: Array< System.Reflection.CType > = null;
        private m_componentTypesForViews: System.Collections.Generic.IDictionary< System.Reflection.CType, Array< System.Reflection.CType > >;

        public constructor(
            componentKernelType: System.Reflection.CType<Core.CComponentKernel<any>>,
            componentTypes: Array< System.Reflection.CType >
        )
        {
            this.m_componentTypesForViews = new System.Collections.Generic.CDictionary< System.Reflection.CType, Array< System.Reflection.CType > >( {
                comparer: this
            });
            this.m_componentKernelType = componentKernelType;
            this.m_componentTypes = componentTypes;
        }

        public GetComponentKernelType(): System.Reflection.CType<Core.CComponentKernel<any>>
        {
            return this.m_componentKernelType;
        }

        public GetComponentTypes( viewType: System.Reflection.CType<CView> ): Array< System.Reflection.CType >
        {
            let componentTypes: Array< System.Reflection.CType >;
            
            componentTypes = this.m_componentTypesForViews.Get( viewType );

            if ( componentTypes == null )
            {
                componentTypes = Array( ...this.m_componentTypes );
                let attrs = viewType.GetCustomAttributes( System.Reflection.TypeOf( Attributes.CAddViewComponentAttribute ), true );
                if ( attrs.length > 0 )
                {
                    for ( let i = 0; i < attrs.length; i ++ )
                    {
                        let attribute = attrs[ i ];
                        componentTypes.push( attribute.ComponentType );
                    }
                }
                this.m_componentTypesForViews.Add( viewType, componentTypes );
            }

            return componentTypes;
        }

        public Equals( a: System.Reflection.CType, b: System.Reflection.CType ): boolean
        {
            return a.IsEquivalentTo( b );
        }
    }
}