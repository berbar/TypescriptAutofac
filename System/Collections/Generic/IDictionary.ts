

namespace iberbar.System.Collections.Generic
{
    export interface IDictionary< TKey, TValue >
    {
        Add( key: TKey, value: TValue ): void;
        ContainKey( key: TKey ): boolean;
        Remove( key: TKey ): void;
        Get( key: TKey ): TValue;
        Clear(): void;
        Each( process: System.TCallback< ( key: TKey, value: TValue ) => void > ): void;
    }
}
