

namespace iberbar.Mvc
{
    export namespace Attributes
    {
        export class CViewModelAttribute extends System.CAttribute
        {
            public constructor()
            {
                super();
            }
        }
    }

    export function ViewModel(): System.UDecoratorFunctionType_ForField
    {
        return System.AttributeDecorate( new Attributes.CViewModelAttribute() );
    }
}