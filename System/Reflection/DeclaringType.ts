
/// <reference path="../UAttributeTarget.ts" />
/// <reference path="../CAttribute.ts" />
/// <reference path="../AttributeUsage.ts" />


namespace iberbar.System.Reflection
{
    @AttributeUsage( UAttributeTarget.Method | UAttributeTarget.Field | UAttributeTarget.Property | UAttributeTarget.Parameter, false, false )
    export class CDeclaringTypeAttribute extends CAttribute
    {
        protected m_type: IDelayType = null;

        protected m_typesGeneric: Array< IDelayType > = null;

        protected m_isGeneric: boolean;

        protected m_typesGenericReal: Array< CType > = null;

        public constructor( type: IDelayType, genericTypes: Array< IDelayType > )
        {
            super();
            this.m_type = type;
            this.m_typesGeneric = genericTypes;
            if ( this.m_typesGeneric == null || this.m_typesGeneric.length == 0 )
                this.m_isGeneric = false;
            else
                this.m_isGeneric = true;
        }

        public get DeclaringType(): CType
        {
            return this.m_type();
        }

        public get GenericTypes(): Array< CType >
        {
            if ( this.m_isGeneric == false )
                return null;
            if ( this.m_typesGenericReal == null )
            {
                for ( let i = 0; i < this.m_typesGeneric.length; i ++ )
                {
                    let gt = this.m_typesGeneric[ i ];
                    this.m_typesGenericReal.push( gt() );
                }
            }
            return this.m_typesGenericReal;
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
            let temp: Array< IDelayType > = Array();
            if ( genericTypes != null && genericTypes.length > 0 )
            {
                for ( let i = 0; i < genericTypes.length; i ++ )
                {
                    let gt = genericTypes[ i ];
                    temp.push( () => gt );
                }
            }
            AttributeDecorate( new CDeclaringTypeAttribute( () => type, temp ) )( target, memberName, <any>descriptorOrParameterIndex );
        }
    }

    /**
     * 声明装饰器-延后
     * 
     * + 装饰 Field 字段：修饰字段类型
     * + 装饰 Property 属性：修饰属性的类型
     * + 装饰 Method 方法：修饰方法的返回值类型
     * + 装饰 Parameter 参数：修饰方法的参数类型
     * 
     * @param type 
     */
    export function DeclaringTypeDelay( type: IDelayType, genericTypes?: IDelayType[] ): UDecoratorFunctionType_ForField & UDecoratorFunctionType_ForProperty & UDecoratorFunctionType_ForMethod & UDecoratorFunctionType_ForParameter
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