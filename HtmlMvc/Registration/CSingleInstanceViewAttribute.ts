


namespace iberbar.Mvc.Registration
{
    export class CSingleInstanceViewAttribute extends System.CAttribute
    {
    }

    export function SingleInstanceView(): System.UDecoratorFunctionType_ForClass
    {
        return System.AttributeDecorate( new CSingleInstanceViewAttribute() );
    }
}

