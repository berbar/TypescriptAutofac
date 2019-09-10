
namespace Network.Socket.Core
{
    export interface IReceiverResolveOperation extends System.IEquatable< IReceiverResolveOperation >
    {
        /**
         * 调用接收器
         * @param context Socket上下文
         * @param lifetimeScope ioc生命周期域
         * @param args 接收到的参数列表
         */
        Resolve( context: CBaseContext, lifetimeScope: Ioc.ILifetimeScope, args: any[] ): void;

        /**
         * 监听的Socket接口名
         */
        readonly MethodName: string;
    }
}
