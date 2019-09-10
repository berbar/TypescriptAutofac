

namespace Autofac.Core
{
    export class CLifetimeScopeService extends CService
    {
        public constructor()
        {
            super();
        }

        public Equals( other: CLifetimeScopeService ): boolean
        {
            return other instanceof CLifetimeScopeService;
        }
    }
}
