
namespace iberbar.System.Metadata.Core
{
    export class CMetadataKeyForParameter extends CMetadataKey
    {
        private readonly m_methodName: string | symbol = null;
        private readonly m_index: number = null;

        public constructor( type: Reflection.CType, target: UAttributeTarget, methodName: string | symbol, index: number )
        {
            super( type, target );
            this.m_index = index;
            this.m_methodName = methodName;
        }

        public Equals( other: CMetadataKey ): boolean
        {
            if ( super.Equals( other ) == false )
                return false;
            if ( other instanceof CMetadataKeyForParameter && this.m_methodName == other.m_methodName && other.m_index == this.m_index )
                return true;
            return false;
        }
    }
}