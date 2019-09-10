

namespace Ioc.Activators
{
    export abstract class CInstanceActivator implements Core.IInstanceActivator
    {
        private readonly m_limitType: System.Reflection.CType = null;

        constructor( implementationType: System.Reflection.CType )
        {
            this.m_limitType = implementationType;
        }

        ActivateInstance(context: IComponentContext, parameters?: Core.CParameter[]): object
        {
            throw new Error("Method not implemented.");
        }

        GetLimitType(): System.Reflection.CType
        {
            return this.m_limitType;
        }

        Dispose(): void
        {
            throw new Error("Method not implemented.");
        }
    }
}