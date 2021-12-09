

namespace iberbar.MVC.KernelJquery.Attributes
{
    @System.AttributeUsage( System.UAttributeTarget.Class, true, false )
    export class CDependOnViewAttribute extends System.CAttribute
    {
        protected m_selectorText: string = null;
        protected m_fromBody: boolean = false;
        protected m_createMethod: UViewCreateStyle = UViewCreateStyle.Append;
        protected m_viewType: System.Reflection.CType< CView > = null;
        protected m_tag: any = null;

        public constructor( viewType: System.Reflection.CType< CView >, selectorText: string )
        {
            super();
            this.m_selectorText = selectorText;
            this.m_viewType = viewType;
        }

        public get ViewType()
        {
            return this.m_viewType;
        }

        public get SelectorText()
        {
            return this.m_selectorText;
        }

        public set FromBody( value: boolean )
        {
            this.m_fromBody = value;
        }
        
        public get FromBody(): boolean
        {
            return this.m_fromBody;
        }

        public set CreateMethod( value: UViewCreateStyle )
        {
            this.m_createMethod = value;
        }

        public get CreateMethod(): UViewCreateStyle
        {
            return this.m_createMethod;
        }

        public set Tag( value: any )
        {
            this.m_tag = value;
        }

        public get Tag(): any
        {
            return this.m_tag;
        }
    };
}