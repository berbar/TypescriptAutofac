

namespace iberbar.Mvc
{
    export namespace Attributes
    {
        @System.AttributeUsage( System.UAttributeTarget.Parameter, false, false )
        export class EventElementAttribute extends System.CAttribute
        {

        }
    }

    export function EventElement(): System.UDecoratorFunctionType_ForParameter
    {
        return System.AttributeDecorate( new Attributes.EventElementAttribute() );
    }
}
