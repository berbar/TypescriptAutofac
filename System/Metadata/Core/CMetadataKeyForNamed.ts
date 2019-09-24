
namespace iberbar.System.Metadata.Core
{
    export class CMetadataKeyForNamed extends CMetadataKey
    {
        private readonly m_name: string | symbol = null;

        public constructor( type: Reflection.CType, target: UAttributeTarget, name: string | symbol )
        {
            super( type, target );
            this.m_name = name;
        }

        public Equals( other: CMetadataKey ): boolean
        {
            if ( super.Equals( other ) == false )
                return false;
            if ( other instanceof CMetadataKeyForNamed && other.m_name == this.m_name )
                return true;
            return false;
        }
    }
}
