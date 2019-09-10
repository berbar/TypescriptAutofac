namespace Mvc
{
    export namespace Attributes
    {
        @System.AttributeUsage( System.UAttributeTarget.Parameter, false, false )
        export class EventViewAttribute extends System.CAttribute
        {

        }
    }

    export function EventView(): System.UDecoratorFunctionType_ForParameter
    {
        return System.AttributeDecorate( new Attributes.EventViewAttribute() );
    }
}