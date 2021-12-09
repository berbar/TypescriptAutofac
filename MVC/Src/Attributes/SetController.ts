

namespace iberbar.MVC
{
    export namespace Attributes
    {
        @System.AttributeUsage( System.UAttributeTarget.Class, true, true )
        export class CSetControllerAttribute extends System.CAttribute
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

    /**
     * **特性**
     * 
     * + 标记视图所使用的控制器类型
     * + 修饰：类
     * 
     * @param controllerType 控制器类型
     */
    export function SetController( controllerType: System.Reflection.IDelayType ): System.UDecoratorFunctionType_ForClass
    {
        return System.AttributeDecorate( new Attributes.CSetControllerAttribute( controllerType ) );
    }
}