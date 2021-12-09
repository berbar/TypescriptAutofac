
namespace iberbar.MVC.Attributes
{

    @System.AttributeUsage( System.UAttributeTarget.Class, true, true )
    export class CAddControllerAttribute extends System.CAttribute
    {
        protected m_controllerType: System.Reflection.IDelayType = null;

        public constructor( controllerType: System.Reflection.IDelayType )
        {
            super();
            this.m_controllerType = controllerType;
        }

        public get ControllerType(): System.Reflection.CType
        {
            return this.m_controllerType();
        }
    }
}