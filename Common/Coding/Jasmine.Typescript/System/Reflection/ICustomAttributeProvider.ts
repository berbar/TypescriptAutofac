

namespace System.Reflection
{
    export interface ICustomAttributeProvider
    {
        GetCustomAttributeOne< TAttribute extends CAttribute >(
            attrType: CType< TAttribute >,
            inherit: boolean
        ): TAttribute;

        GetCustomAttributes< TAttribute extends CAttribute >(
            attrType: CType< TAttribute >,
            inherit: boolean
        ): TAttribute[];

        GetCustomAttributesAll(): CAttribute[];

        IsDefined< TAttribute extends CAttribute >(
            attrType: CType< TAttribute >,
            inherit: boolean
        ): boolean;
    }
}