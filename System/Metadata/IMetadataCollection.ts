

namespace iberbar.System.Metadata
{
    export interface IMetadataCollection extends IMetadataCollectionReadonly
    {
        AddAttribute( attribute: CAttribute ): void
    }
}
