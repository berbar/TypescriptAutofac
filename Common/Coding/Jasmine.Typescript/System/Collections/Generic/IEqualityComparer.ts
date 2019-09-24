

namespace iberbar.System.Collections.Generic
{
    export interface IEqualityComparer< T >
    {
        Equals( a: T, b: T ): boolean;
    }
}