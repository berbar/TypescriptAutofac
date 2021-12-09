

namespace iberbar.MVC
{
    export function AddViewComponent( componentType: System.Reflection.IDelayType ): System.UDecoratorFunctionType_ForClass
    {
        return System.AttributeDecorate( new Attributes.CAddViewComponentAttribute( componentType ) );
    }
}