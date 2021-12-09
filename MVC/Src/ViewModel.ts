

namespace iberbar.MVC
{
    export function ViewModel(): System.UDecoratorFunctionType_ForField
    {
        return System.AttributeDecorate( new Attributes.CViewModelAttribute() );
    }
}