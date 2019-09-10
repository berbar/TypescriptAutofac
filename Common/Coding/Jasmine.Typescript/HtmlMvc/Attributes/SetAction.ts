

namespace Mvc
{
    export namespace Attributes
    {
        @System.AttributeUsage( System.UAttributeTarget.Method, true, false )
        export class SetActionAttribute extends System.CAttribute
        {
            protected m_event: string = null;
            protected m_selectorText: string = null;
            protected m_fromBody: boolean = false;
    
            public constructor( event: string, selectorText: string, fromBody: boolean )
            {
                super();
                this.m_event = event;
                this.m_selectorText = selectorText;
                this.m_fromBody = fromBody;
            }
    
            public get Event() : string
            {
                return this.m_event;
            }
            
            public get SelectorText() : string
            {
                return this.m_selectorText;
            }

            public get FromBody(): boolean
            {
                return this.m_fromBody;
            }
        }
    }

    export const uActionName_FocusIn = "focusin";
    export const uActionName_FocusOut = "focusout";
    export const uActionName_MouseOver = "mouseover";
    export const uActionName_MouseOut = "mouseout";

    /**
     * **特性**
     * 
     * + 标志控制器方法，绑定JQuery事件
     * + 修饰：方法
     * 
     * @param event 事件类型
     * @param selectorText JQuery选择器
     * @param fromBody 是否从Body开始选择
     */
    export function SetAction( event: string, selectorText: string, fromBody?: boolean ): System.UDecoratorFunctionType_ForMethod
    {
        return System.AttributeDecorate( new Attributes.SetActionAttribute( event, selectorText, ( fromBody == true ) ? true : false ) );
    }

    export function SetActionClick( selectorText: string, fromBody?: boolean ): System.UDecoratorFunctionType_ForMethod
    {
        return SetAction( "click", selectorText, fromBody );
    }

    export function SetActionValueChange( selectorText: string, fromBody?: boolean ): System.UDecoratorFunctionType_ForMethod
    {
        return SetAction( "valuechange", selectorText, fromBody );
    }

    export function SetActionSearch( selectorText: string, fromBody?: boolean ): System.UDecoratorFunctionType_ForMethod
    {
        return SetAction( "search", selectorText, fromBody );
    }

    export function SetActionFocusIn( selectorText: string, fromBody?: boolean ): System.UDecoratorFunctionType_ForMethod
    {
        return SetAction( uActionName_FocusIn, selectorText, fromBody );
    }

    export function SetActionFocusOut( selectorText: string, fromBody?: boolean ): System.UDecoratorFunctionType_ForMethod
    {
        return SetAction( uActionName_FocusOut, selectorText, fromBody );
    }

    export function SetActionMouseOver( selectorText: string, fromBody?: boolean ): System.UDecoratorFunctionType_ForMethod
    {
        return SetAction( uActionName_MouseOver, selectorText, fromBody );
    }

    export function SetActionMouseOut( selectorText: string, fromBody?: boolean ): System.UDecoratorFunctionType_ForMethod
    {
        return SetAction( uActionName_MouseOut, selectorText, fromBody );
    }
}