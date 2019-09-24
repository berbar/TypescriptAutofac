

namespace iberbar.Autofac.Core
{
    export interface IDisposer extends System.IDisposable
    {
        AddInstanceForDisposal( instance: System.IDisposable ): void;
    }
}