

namespace System.Collections.Generic
{
    export class CEqualityComparer< T > implements IEqualityComparer< T >
    {
        Equals( a: T, b: T ): boolean
        {
            return a === b;
        }
    }
}
