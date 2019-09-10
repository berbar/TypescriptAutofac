

namespace System
{
    export type Action< T > = TCallback< ( t: T ) => void >;
}