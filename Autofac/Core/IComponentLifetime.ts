

namespace iberbar.Autofac.Core
{
    export interface IComponentLifetime
    {
        FindScope( mostNestedVisibleScope: ISharingLifetimeScope ): ISharingLifetimeScope;
    }
}