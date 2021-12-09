
namespace iberbar.MVC.KernelJquery
{
    export function TriggerEvent(): System.UDecoratorFunctionType_ForParameter
    {
        return System.AttributeDecorate( new Attributes.CTriggerEventAttribute() );
    }
}