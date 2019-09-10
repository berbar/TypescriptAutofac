
namespace Mvc
{
    export namespace Attributes
    {
        @System.AttributeUsage( System.UAttributeTarget.Field, false, false )
        export class FromElementAttribute extends System.CAttribute
        {
            protected m_selectorText: string = null;
            protected m_fromBody: boolean = false;
    
            public constructor( selectorText: string, fromBody: boolean )
            {
                super();
                this.m_selectorText = selectorText;
            }
    
            public get SelectorText(): string
            {
                return this.m_selectorText;
            }

            public get FromBody(): boolean
            {
                return this.m_fromBody;
            }
        };
    }


    /**
     * **(特性)**
     * 
     * + 获取JQuery元素，内部会调用 System.Reflection.Enumerable 装饰器
     * + 修饰：字段
     * 
     * @param selectorText JQuery选择器
     * @param fromBody (可选)是否从Body开始查找选择
     */
    export function FromElement( selectorText: string, fromBody?: boolean ): System.UDecoratorFunctionType_ForField
    {
        return function( target: any, fieldName: string )
        {
            System.Reflection.Enumerable( target, fieldName );
            System.AttributeDecorate( new Attributes.FromElementAttribute( selectorText, (fromBody == true) ? true : false ) )( target, fieldName );
        }
    }
}
