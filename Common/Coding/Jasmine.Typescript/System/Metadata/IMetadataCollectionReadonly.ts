

namespace System.Metadata
{
    export interface IMetadataCollectionReadonly
    {
        GetAttributeOne< T extends CAttribute >( type: System.Reflection.CType< T > ): T;

        GetAttributes< T extends CAttribute >( type: System.Reflection.CType< T > ): T[];

        GetAttributesAll(): CAttribute[];
    }
}
