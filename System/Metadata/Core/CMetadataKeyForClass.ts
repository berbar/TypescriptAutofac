
namespace System.Metadata.Core
{
    export class CMetadataKeyForClass extends CMetadataKey
    {
        public constructor( type: Reflection.CType, target: UAttributeTarget )
        {
            super( type, target );
        }

        public Equals( other: CMetadataKey ): boolean
        {
            if ( super.Equals( other ) == false )
                return false;
            if ( other instanceof CMetadataKeyForClass )
                return true;
            return false;
        }
    }
}
