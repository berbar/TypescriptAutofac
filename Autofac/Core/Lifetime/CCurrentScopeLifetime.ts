

namespace Ioc.Core.Lifetime
{
    export class CCurrentScopeLifetime implements IComponentLifetime
    {
        FindScope(mostNestedVisibleScope: ISharingLifetimeScope): ISharingLifetimeScope
        {
            return mostNestedVisibleScope;
        }
        
    }
}