

namespace iberbar.Autofac.Core
{
    export interface ISharingLifetimeScope extends ILifetimeScope
    {
        GetParentLifetimeScope(): ISharingLifetimeScope;

        GetRootLifetimeScope(): ISharingLifetimeScope;

        GetOrCreateAndShare( id: string, creator: System.TCallback< () => object > ): object;
    }
}