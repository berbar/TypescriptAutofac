

namespace Autofac
{
    @System.AttributeUsage( System.UAttributeTarget.Parameter | System.UAttributeTarget.Property, false, false )
    export class CInjectLifetimeScopeAttribute extends System.CAttribute
    {
    }

    export function InjectLifetimeScope(): System.UDecoratorFunctionType_ForParameter & System.UDecoratorFunctionType_ForProperty
    {
        return System.AttributeDecorate( new CInjectLifetimeScopeAttribute() );
    }
}
