

namespace iberbar.MVC.KernelJquery
{
    export function OverScroll( selectorText: string ): System.UDecoratorFunctionType_ForClass
    {
        return System.AttributeDecorate( new Attributes.COverScrollAttribute( selectorText ) );
    }
}