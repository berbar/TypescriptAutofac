

namespace iberbar.MVC
{
    export function AddController( controllerType: System.Reflection.IDelayType ): System.UDecoratorFunctionType_ForClass
    {
        return System.AttributeDecorate( new Attributes.CAddControllerAttribute( controllerType ) );
    }
}