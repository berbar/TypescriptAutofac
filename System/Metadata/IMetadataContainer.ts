
namespace iberbar.System.Metadata
{
    export interface IMetadataContainer
    {
        GetOrAddCollection( key: Core.CMetadataKey ): IMetadataCollection;

        GetCollection( key: Core.CMetadataKey ): IMetadataCollectionReadonly;
    }
}
