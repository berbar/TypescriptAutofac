

namespace iberbar.MVC.KernelJquery.Attributes
{
    @System.AttributeUsage( System.UAttributeTarget.Method, true, false )
    export class CSetActionAttribute extends System.CAttribute
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