

namespace Ioc.Core
{
    export interface IInstanceActivator extends System.IDisposable
    {
        ActivateInstance( context: IComponentContext, parameters?: CParameter[] ): object;

        GetLimitType(): System.Reflection.CType;
    }
}