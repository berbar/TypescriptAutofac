

namespace iberbar.Autofac.Core.Resolving
{
    export interface IInstanceLookup
    {
        GetComponentRegistration(): IComponentRegistration;

        GetActivationScope(): ILifetimeScope;

        GetParameters(): CParameter[];
    }
}