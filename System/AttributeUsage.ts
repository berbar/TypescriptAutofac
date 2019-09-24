
/// <reference path="./CAttributeUsageAttribute.ts" />


namespace iberbar.System
{
    /**
     * 
     * @param validOn 
     * @param allowMultiple 
     * @param inherit 
     */
    export function AttributeUsage( validOn: number, allowMultiple?: boolean, inherit?: boolean ): UDecoratorFunctionType_ForClass
    {
        return AttributeDecorate( new CAttributeUsageAttribute( validOn, allowMultiple, inherit ) );
    }
}