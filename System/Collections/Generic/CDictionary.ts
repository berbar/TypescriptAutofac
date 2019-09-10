

namespace System.Collections.Generic
{
    export class CDictionary< TKey, TValue > implements IDictionary< TKey, TValue >
    {
        private m_comparer: IEqualityComparer< TKey > = new CEqualityComparer< TKey >();

        private m_data: { key: TKey, value: TValue }[] = [];

        constructor( options?: {
            comparer?: IEqualityComparer< TKey >
        } )
        {
            if ( options != null )
            {
                if ( options.comparer != null )
                    this.m_comparer = options.comparer;
            }
        }

        Add(key: TKey, value: TValue): void
        {
            if ( this.ContainKey( key ) )
                throw new Error();
            this.m_data.push( { key: key, value: value } );
        }

        ContainKey(key: TKey): boolean
        {
            for ( const n of this.m_data )
            {
                if ( this.m_comparer.Equals( n.key, key ) )
                    return true;
            }
            return false;
        }

        Remove(key: TKey): void
        {
            throw new Error("Method not implemented.");
        }

        Get(key: TKey): TValue
        {
            for ( const n of this.m_data )
            {
                if ( this.m_comparer.Equals( n.key, key ) )
                    return n.value;
            }
            return null;
        }

        Clear(): void
        {
            // for ( const n of this.m_data )
            // {
            //     if ( n.value != null && (<any>n.value)[ "Dispose" ] != null )
            //     {
            //         (<any>n.value)[ "Dispose" ]();
            //     }
            // }
            this.m_data = [];
        }

        public Each( process: System.TCallback< ( key: TKey, value: TValue ) => void > ): void
        {
            for ( const n of this.m_data )
            {
                process.Execute( n.key, n.value );
            }
        }
    }
}