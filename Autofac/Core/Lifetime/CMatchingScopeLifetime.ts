

namespace Autofac.Core.Lifetime
{
    export class CMatchingScopeLifetime implements IComponentLifetime
    {
        private readonly m_tagToMatch: ULifetimeScopeTagType[] = null;

        public constructor( ...scopeTag: ULifetimeScopeTagType[] )
        {
            this.m_tagToMatch = scopeTag;
        }
        
        FindScope(mostNestedVisibleScope: ISharingLifetimeScope): ISharingLifetimeScope
        {
            let next = mostNestedVisibleScope;
            while ( next )
            {
                if ( this.m_tagToMatch.indexOf( next.GetTag() ) >= 0 )
                    return next;
                next = next.GetParentLifetimeScope();
            }
            throw new Error();
        }
        
    }
}