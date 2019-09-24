

namespace iberbar.Autofac.Builder
{
    export interface IActivatorData
    {
        GetTypes(): ( t: System.Reflection.CType ) => System.Reflection.CType;

        GetActivator(): Core.IInstanceActivator;
    }
}
