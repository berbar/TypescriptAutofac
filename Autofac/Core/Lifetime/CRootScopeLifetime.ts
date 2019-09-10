

namespace Ioc.Core.Lifetime
{
    export class CRootScopeLifetime implements IComponentLifetime
    {
        FindScope(mostNestedVisibleScope: ISharingLifetimeScope): ISharingLifetimeScope
        {
            return mostNestedVisibleScope.GetRootLifetimeScope();
        }
        
    }
}