

namespace iberbar.MVC.KernelJquery.Attributes
{
    @System.AttributeUsage( System.UAttributeTarget.Class, true, true )
    export class COverScrollAttribute extends System.CAttribute
    {
        protected m_selectorText: string = null;
    
        public constructor( selectorText: string )
        {
            super();
            this.m_selectorText = selectorText;
        }
    
        public get SelectorText(): string
        {
            return this.m_selectorText;
        }
    };
}
