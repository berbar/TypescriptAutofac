

namespace iberbar.Mvc.Registration
{
    export class CRegistrator
    {
        private m_builder: Autofac.CContainerBuilder = null;

        public constructor( builder: Autofac.CContainerBuilder )
        {
            this.m_builder = builder;
        }

        public RegisterViewsAndControllers( ...assemblies: System.Reflection.CAssembly[] ): void
        {
            const vt = TypeOf( CView );
            const ct = TypeOf( CViewController );
            this.m_builder.RegisterAssemblyTypes( ...assemblies ).Where( t => t.IsInheritFrom( ct ) ).AsSelf().InstancePerDependency();
            let viewTypes_SingleInstance: Array< System.Reflection.CType > = Array();
            let viewTypes_Transient: Array< System.Reflection.CType > = Array();
            assemblies.forEach( assembly =>
            {
                let types = assembly.GetTypes();
                types.forEach( t =>
                {
                    if ( t.IsInheritFrom( vt ) == false )
                        return;
                    if ( t.GetCustomAttributeOne( TypeOf( CSingleInstanceViewAttribute ), true ) == null )
                        viewTypes_Transient.push( t );
                    else
                        viewTypes_SingleInstance.push( t );
                })
            } );
            this.m_builder.RegisterTypes( viewTypes_SingleInstance ).AsSelf().SingleInstance();
            this.m_builder.RegisterTypes( viewTypes_Transient ).AsSelf().InstancePerDependency();
        }
    }
}