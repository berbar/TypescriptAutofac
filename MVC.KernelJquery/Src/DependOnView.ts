
namespace iberbar.MVC.KernelJquery
{
    export function DependOnView( viewType: System.Reflection.CType< CView >, selectorText: string, options?: { fromBody?: boolean, createMethod?: UViewCreateStyle, tag?: any } ): System.UDecoratorFunctionType_ForClass
    {
        if ( viewType == null )
        {
            throw new Error( "viewType must be valid." );
        }
        // if ( selectorText == null )
        // {
        //     throw new Error( "selectorText must be valid." );
        // }
        let attribute = new Attributes.CDependOnViewAttribute( viewType, selectorText );
        if ( options != null )
        {
            if ( options.fromBody != null )
            {
                attribute.FromBody = options.fromBody;
            }
            if ( options.createMethod != null )
            {
                attribute.CreateMethod = options.createMethod;
            }
            if ( options.tag != null )
            {
                attribute.Tag = options.tag;
            }
        }
        return System.AttributeDecorate( attribute );
    }
}