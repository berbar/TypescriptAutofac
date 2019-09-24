
/// <reference path="./CMetadataCollection.ts" />


namespace iberbar.System.Metadata.Core
{
    export class CMetadataContainer implements IMetadataContainer, Collections.Generic.IEqualityComparer<CMetadataKey>
    {
        private readonly m_pool: Collections.Generic.IDictionary< CMetadataKey, IMetadataCollection > = new Collections.Generic.CDictionary( { comparer: this } );

        public GetOrAddCollection( key: Core.CMetadataKey ): IMetadataCollection
        {
            let collection = this.m_pool.Get( key );
            if ( collection == null )
            {
                this.m_pool.Add( key, collection = new CMetadataCollection() );
            }
            return collection;
        }

        public GetCollection( key: Core.CMetadataKey ): IMetadataCollectionReadonly
        {
            let collection = this.m_pool.Get( key );
            if ( collection == null )
                return CMetadataContainer.EmptyCollection;
            return collection;
        }

        public Equals( a: CMetadataKey, b: CMetadataKey ): boolean
        {
            return a.Equals( b );
        }

        public static readonly EmptyCollection = new CMetadataCollection();
    }
}
