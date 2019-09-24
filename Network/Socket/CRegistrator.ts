

namespace iberbar.Network.Socket
{
    export class CRegistrator
    {
        private readonly m_cb: Autofac.CContainerBuilder = null;

        public constructor( cb: Autofac.CContainerBuilder )
        {
            this.m_cb = cb;
            this.m_cb.RegisterType( System.Reflection.TypeOf( CContextAccessor ) ).AsSelf().SingleInstance();
        }
    
        public Add< TContext extends iberbar.Network.Socket.CContext >(
            contextType: iberbar.System.Reflection.CType< TContext >,
            connection: iberbar.Network.Socket.CConnection,
            receiversTypes: ReadonlyArray< iberbar.System.Reflection.CType > ): void
        {
            this.m_cb
                .RegisterType( contextType )
                .AsSelf()
                .SingleInstance()
                .WithParameter( new iberbar.Autofac.CTypedParameter( iberbar.System.Reflection.TypeOf( iberbar.Network.Socket.CConnection ), connection ) )
                .OnActivating( ( e ) =>
                {
                    let typedService = new Autofac.Core.CTypedService( System.Reflection.TypeOf( CContextAccessor ) );
                    let registration = e.Context.ComponentRegistry.GetRegistration( typedService );
                    let contextAccessor: CContextAccessor = <CContextAccessor>e.Context.ResolveComponent( registration, [] );
                    contextAccessor.AddSocketContext( e.Instance );
                    e.Instance.AddReceivers( receiversTypes );
                    e.Instance.BindReceivers();
                });
    
            this.m_cb
                .RegisterTypes( receiversTypes )
                .AsSelf()
                .InstancePerDependency();
        }

        public FindReceiverTypes( assembly: System.Reflection.CAssembly ): Array< System.Reflection.CType >
        {
            return assembly.GetTypes().where( t =>
            {
                    if ( t.IsInheritFrom( System.Reflection.TypeOf( Network.Socket.CReceiver ) ) )
                    return true;
                if ( t.GetMethodOne( "OnReceived" ) != null )
                    return true;
                return false;
            });
        }
    }
}
