

namespace iberbar.System
{
    export function dynamic_cast<T extends object>( o: any, t: iberbar.System.Reflection.TypeConstructor< T > )
    {
        if ( o instanceof t )
            return <T>o;
        return null;
    }
}