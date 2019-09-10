

namespace System.Reflection
{
    @AttributeUsage( UAttributeTarget.Method | UAttributeTarget.Field | UAttributeTarget.Property | UAttributeTarget.Parameter, false, false )
    export class CDeclaringTypeAttribute extends CAttribute
    {
        protected m_type: CType = null;

        protected m_typesGeneric: Array< CType > = null;

        public constructor( type: CType, genericTypes: Array< CType > )
        {
            super();
            this.m_type = type;
            this.m_typesGeneric = genericTypes;
        }

        public get DeclaringType(): CType
        {
            return this.m_type;
        }

        public get GenericTypes(): Array< CType >
        {
            return this.m_typesGeneric;
        }

        public get IsGenericType(): boolean
        {
            return ( this.m_typesGeneric == undefined || this.m_typesGeneric.length == 0 ) ? false : true;
        }
    }

    /**
     * 声明装饰器
     * 
     * + 装饰 Field 字段：修饰字段类型
     * + 装饰 Property 属性：修饰属性的类型
     * + 装饰 Method 方法：修饰方法的返回值类型
     * + 装饰 Parameter 参数：修饰方法的参数类型
     * 
     * @param type 
     */
    export function DeclaringType( type: CType, genericTypes?: CType[] ): UDecoratorFunctionType_ForField & UDecoratorFunctionType_ForProperty & UDecoratorFunctionType_ForMethod & UDecoratorFunctionType_ForParameter
    {
        return function( target: any, memberName: string, descriptorOrParameterIndex?: PropertyDescriptor | number )
        {
            if ( typeof( descriptorOrParameterIndex ) == "undefined" || typeof( descriptorOrParameterIndex ) == "object" )
            {
                Enumerable( target, memberName, descriptorOrParameterIndex );
            }
            AttributeDecorate( new CDeclaringTypeAttribute( type, genericTypes ) )( target, memberName, <any>descriptorOrParameterIndex );
        }
    }
}