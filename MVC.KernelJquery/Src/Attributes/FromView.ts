


namespace iberbar.MVC.KernelJquery
{
    export namespace Attributes
    {
        export class FromViewAttribute extends System.CAttribute
        {
            private m_tag: any = null;

            public constructor()
            {
                super();
            }

            public set Tag( value: any )
            {
                this.m_tag = value;
            }

            public get Tag()
            {
                return this.m_tag;
            }
        };
    }


    export function FromView( opts?: { tag?: any } ): System.UDecoratorFunctionType_ForField
    {
        let attr = new Attributes.FromViewAttribute();
        if ( opts != null )
        {
            if ( opts.tag != null )
            {
                attr.Tag = opts.tag;
            }
        }
        return System.AttributeDecorate( attr );
    }
}