
namespace Network.Socket.Core
{
    export class CReceiverResolveOperation implements IReceiverResolveOperation
    {
        private readonly m_receiverType: System.Reflection.CType = null;
        private readonly m_methodName: string = null;
        private readonly m_methodInfo: System.Reflection.CMethodInfo = null;

        public constructor( receiverType: System.Reflection.CType, methodName: string, methodInfo: System.Reflection.CMethodInfo )
        {
            this.m_receiverType = receiverType;
            this.m_methodName = methodName;
            this.m_methodInfo = methodInfo;
        }

        public Resolve( context: CBaseContext, lifetimeScope: Ioc.ILifetimeScope, args: any[] ): void
        {
            let parameters: Ioc.Core.CParameter[] =
            [
                new Ioc.CTypedParameter( System.Reflection.TypeOf( CBaseContext ), context ),
            ];
            let receiver = lifetimeScope.Resolve( this.m_receiverType, ...parameters );
            this.m_methodInfo.Invoke( receiver, ...args );
        }

        public get MethodName(): string
        {
            return this.m_methodName;
        }

        public Equals( other: CReceiverResolveOperation ): boolean
        {
            return this.m_receiverType.IsEquivalentTo( other.m_receiverType ) && this.m_methodInfo.Name == other.m_methodInfo.Name;
        }
    }
}
