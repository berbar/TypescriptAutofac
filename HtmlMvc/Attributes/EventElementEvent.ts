

namespace Mvc
{
    export namespace Attributes
    {
        @System.AttributeUsage( System.UAttributeTarget.Parameter, false, false )
        export class EventElementEventAttribute extends System.CAttribute
        {

        }
    }

    export function EventElementEvent(): System.UDecoratorFunctionType_ForParameter
    {
        return System.AttributeDecorate( new Attributes.EventElementEventAttribute() );
    }
}

