


namespace iberbar.Mvc
{
    export namespace Attributes
    {
        export class FromViewAttribute extends System.CAttribute
        {
            public constructor()
            {
                super();
            }
        };
    }


    export function FromView(): System.UDecoratorFunctionType_ForField
    {
        return System.AttributeDecorate( new Attributes.FromViewAttribute() );
    }
}