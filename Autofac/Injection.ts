

namespace Ioc
{
    @System.AttributeUsage( System.UAttributeTarget.Field, false, false )
    export class CInjectionAttribute extends System.CAttribute
    {
    };

    @System.AttributeUsage( System.UAttributeTarget.Field | System.UAttributeTarget.Parameter, false, false )
    export class CInjectionProviderAttribute extends System.CAttribute
    {
    }

    @System.AttributeUsage( System.UAttributeTarget.Field | System.UAttributeTarget.Parameter, false, false )
    export class CWithNameAttribute extends System.CAttribute
    {
        protected m_name: string = null;
        public constructor( name: string )
        {
            super();
            this.m_name = name;
        }

        public get Name()
        {
            return this.m_name;
        }
    }

    @System.AttributeUsage( System.UAttributeTarget.Field | System.UAttributeTarget.Parameter, false, false )
    export class CWithKeyAttribute extends System.CAttribute
    {
        protected m_key: IKey = null;
        public constructor( key: IKey )
        {
            super();
            this.m_key = key;
        }

        public get Key()
        {
            return this.m_key;
        }
    }

    /**
     * **（函数声明）**
     * 
     * 在类字段位置声明注入
     */
    export function Injection(): System.UDecoratorFunctionType_ForField
    {
        return System.Attribute( new CInjectionAttribute() );
    }

    /**
     * 注入IProvider提供器
     */
    export function InjectionProvider(): System.UDecoratorFunctionType_ForField & System.UDecoratorFunctionType_ForParameter
    {
        return function ( target: any, memberName: string, parameterIndex?: number )
        {
            if ( parameterIndex == undefined )
            {
                System.Reflection.Enumerable( target, memberName );
            }
            System.Attribute( new CInjectionProviderAttribute() )( target, memberName, parameterIndex );
        }
    }

    export function WithName( name: string ): System.UDecoratorFunctionType_ForField & System.UDecoratorFunctionType_ForParameter
    {
        return System.Attribute( new CWithNameAttribute( name ) );
    }

    export function WithKey( key: IKey ): System.UDecoratorFunctionType_ForField & System.UDecoratorFunctionType_ForParameter
    {
        return System.Attribute( new CWithKeyAttribute( key ) );
    }


    // /**
    //  * **（数据类型声明）**
    //  * 
    //  * Injection方法的返回类型声明
    //  */
    // export type UInjectionReturn = (
    //     typeWhere: any,
    //     propertyKey: string,
    //     parameterIndex?: number
    // ) => void;

    // /**
    //  * **（函数声明）**
    //  * 
    //  * 在属性或者构造器中的参数位置声明注入
    //  * @param type 注入类型
    //  * @param name 键名、别名
    //  */
    // export function Injection( type: System.Reflection.CType, name?: string | IKey ): UInjectionReturn
    // {
    //     return function(
    //         target: any,
    //         propertyKey: string,
    //         parameterIndex?: number ): void
    //     {
    //         let prototype: System.Reflection.TypePrototype< object > & Builder.UInjectionOnTypePrototype = null;
    //         // 属性注入
    //         if ( parameterIndex == undefined )
    //         {
    //             prototype = target;

    //             let defs: { [ key: string ]: Builder.UInjectionNode } = null;
    //             if ( prototype.hasOwnProperty( Builder.uInjectionForField ) == false )
    //             {
    //                 let defsOld: { [ key: string ]: Builder.UInjectionNode } = prototype[ Builder.uInjectionForField ];
    //                 defs = prototype[ Builder.uInjectionForField ] = Object.assign( {}, defsOld );
    //             }
    //             else
    //             {
    //                 defs = prototype[ Builder.uInjectionForField ];
    //             }
    //             let injectionNode: Builder.UInjectionNode =
    //             {
    //                 type: type
    //             };
    //             if ( name != null )
    //             {
    //                 if ( typeof( name ) == "string" )
    //                     injectionNode.name = name;
    //                 else
    //                     injectionNode.key = name;
    //             }
    //             defs[ propertyKey ] = injectionNode;
    //         }
    //         else
    //         {
    //             // 构造函数注入
    //             if ( propertyKey == undefined )
    //             {
    //                 prototype = target.prototype;
                    
    //                 let defs: Builder.UInjectionNode[] = null;
    //                 if ( prototype.hasOwnProperty( Builder.uInjectionForConstructor ) == false )
    //                 {
    //                     defs = prototype[ Builder.uInjectionForConstructor ] = Array( prototype.constructor.length );
    //                 }
    //                 else
    //                 {
    //                     defs = prototype[ Builder.uInjectionForConstructor ];
    //                 }
    //                 let injectionNode: Builder.UInjectionNode =
    //                 {
    //                     type: type
    //                 };
    //                 if ( name != null )
    //                 {
    //                     if ( typeof( name ) == "string" )
    //                         injectionNode.name = name;
    //                     else
    //                         injectionNode.key = name;
    //                 }
    //                 defs[ parameterIndex ] = injectionNode;
    //             }
    //             // 方法注入
    //             else
    //             {
    //                 prototype = target;

    //                 let defs: { [ key: string ]: Builder.UInjectionNode } = null;
    //                 if ( prototype.hasOwnProperty( Builder.uInjectionForMethod ) == false )
    //                 {
    //                     defs = prototype[ Builder.uInjectionForMethod ] = {};
    //                 }
    //                 else
    //                 {
    //                     defs = prototype[ Builder.uInjectionForMethod ];
    //                 }
    //                 let injectionNode: Builder.UInjectionNode =
    //                 {
    //                     type: type,
    //                 };
    //                 if ( name != null )
    //                 {
    //                     if ( typeof( name ) == "string" )
    //                         injectionNode.name = name;
    //                     else
    //                         injectionNode.key = name;
    //                 }
    //                 defs[ parameterIndex ] = injectionNode;
    //             }
    //         }
    //     }
    // }
}