
namespace iberbar.MVC
{
    export function DisableViewComponent( componentType: System.Reflection.IDelayType ): System.UDecoratorFunctionType_ForClass
    {
        return System.AttributeDecorate( new Attributes.CDisableViewComponentAttribute( componentType ) );
    }
}