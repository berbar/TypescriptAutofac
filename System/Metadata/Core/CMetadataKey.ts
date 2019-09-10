
namespace System.Metadata.Core
{
    export abstract class CMetadataKey implements IEquatable<CMetadataKey>
    {
        private readonly m_type: Reflection.CType;
        private readonly m_target: UAttributeTarget;

        public constructor( type: Reflection.CType, target: UAttributeTarget )
        {
            this.m_type = type;
            this.m_target = target;
        }

        public Equals(other: CMetadataKey): boolean
        {
            return this.m_type.IsEquivalentTo( other.m_type ) && this.m_target == other.m_target;
        }
    }
}
