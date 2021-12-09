

namespace iberbar.MVC.Attributes
{
    @System.AttributeUsage( System.UAttributeTarget.Class, true, true )
    export class CAddViewComponentAttribute extends System.CAttribute
    {
        private readonly m_componentType: System.Reflection.IDelayType = null;

        public constructor( componentType: System.Reflection.IDelayType )
        {
            super();
            this.m_componentType = componentType;
        }

        public get ComponentType(): System.Reflection.CType
        {
            return this.m_componentType();
        }
    }
}