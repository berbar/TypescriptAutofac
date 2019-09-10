

namespace System.Reflection
{
    export abstract class CParameterInfo implements ICustomAttributeProvider
    {
        protected constructor()
        {
        }
        
        public abstract get ParameterIndex(): number;

        public abstract get ParameterType(): CType;

        public abstract GetCustomAttributeOne< TAttribute extends CAttribute >( attributeType: CType< TAttribute > ): TAttribute;

        public abstract GetCustomAttributes< TAttribute extends CAttribute >( attributeType: CType< TAttribute > ): TAttribute[];

        public abstract GetCustomAttributesAll(): CAttribute[];

        public abstract IsDefined< TAttribute extends CAttribute >( attributeType: CType< TAttribute > ): boolean;
    }
}