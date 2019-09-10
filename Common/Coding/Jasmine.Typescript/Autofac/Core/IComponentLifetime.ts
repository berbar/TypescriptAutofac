

namespace Ioc.Core
{
    export interface IComponentLifetime
    {
        FindScope( mostNestedVisibleScope: ISharingLifetimeScope ): ISharingLifetimeScope;
    }
}