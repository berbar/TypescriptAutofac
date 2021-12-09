

namespace iberbar.MVC
{
    export namespace Attributes
    {
        @System.AttributeUsage( System.UAttributeTarget.Method, false, false )
        export class SetActionSummaryAttribute extends System.CAttribute
        {
            protected m_name: string = null;
            protected m_summary: string = null;
    
            public constructor( name: string, summary: string )
            {
                super();
                this.m_name = name;
                this.m_summary = summary;
            }
            
            public get Name() : string {
                return this.m_name;
            }
            
            public get Summary() : string {
                return this.m_summary;
            }
        }
    }
}