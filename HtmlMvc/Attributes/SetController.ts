

namespace Mvc
{
    export namespace Attributes
    {
        @System.AttributeUsage( System.UAttributeTarget.Class, false, false )
        export class SetControllerAttribute extends System.CAttribute
        {
            protected m_controllerType: System.Reflection.CType< CViewController > = null;
    
            public constructor( controllerType: System.Reflection.CType< CViewController > )
            {
                super();
                this.m_controllerType = controllerType;
            }
    
            public get ControllerType()
            {
                return this.m_controllerType;
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
    export function SetController( controllerType: System.Reflection.CType< CViewController >): System.UDecoratorFunctionType_ForClass
    {
        return System.AttributeDecorate( new Attributes.SetControllerAttribute( controllerType ) );
    }
}