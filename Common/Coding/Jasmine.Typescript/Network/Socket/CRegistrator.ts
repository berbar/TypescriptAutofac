

namespace iberbar.Network.Socket
{
    /**
     * 用于注册到Ioc容器
     */
    export class CRegistrator
    {
        private readonly m_cb: Autofac.CContainerBuilder = null;

        public constructor( cb: Autofac.CContainerBuilder )
        {
            this.m_cb = cb;
            this.m_cb.RegisterType( System.Reflection.TypeOf( CContextAccessor ) ).AsSelf().SingleInstance();
        }
    
        /**
         * 注册Socket上下文类型
         * @param contextType 上下文类型
         * @param connection socket连接实例
         * @param receiversTypes 接收器类型集合
         */
        public Add< TContext extends iberbar.Network.Socket.CContext >(
            contextType: iberbar.System.Reflection.CType< TContext >,
            connection: iberbar.Network.Socket.CConnection,
            receiversTypes: ReadonlyArray< iberbar.System.Reflection.CType >,
            //autoConnectWhenResolved?: boolean
        ): void
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
                    // if ( autoConnectWhenResolved == true )
                    // {
                    //     e.Instance.Connection.Connect()
                    //         .then( function()
                    //         {

                    //         }).catch( function()
                    //         {

                    //         }).finally( function()
                    //         {

                    //         });
                    // }
                });
    
            this.m_cb
                .RegisterTypes( receiversTypes )
                .AsSelf()
                .InstancePerDependency();
        }

        /**
         * 搜索JS模块中的接收器类型集合
         * @param assembly JS模块
         */
        public FindReceiverTypes( ...assemblies: ReadonlyArray< System.Reflection.CAssembly > ): Array< System.Reflection.CType >
        {
            let types: Array< System.Reflection.CType > = Array();
            for ( const assembly of assemblies )
            {
                types = types.concat( assembly.GetTypes().where( t =>
                {
                        if ( t.IsInheritFrom( System.Reflection.TypeOf( Network.Socket.CReceiver ) ) )
                        return true;
                    if ( t.GetMethodOne( "OnReceived" ) != null )
                        return true;
                    return false;
                }) );
            }
            return types;
        }
    }
}
