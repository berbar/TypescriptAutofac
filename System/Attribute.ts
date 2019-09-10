


// !! 继承关系，先引用object
/// <reference path="./Object.ts" />

/// <reference path="./AttributeDecorate.ts" />




namespace System
{
    /**
     * 特性基类
     */
    export class CAttribute
    {
    };

    export var Attribute = AttributeDecorate;

    /**
     * 
     * @param validOn 
     * @param allowMultiple 
     * @param inherit 
     */
    export function AttributeUsage( validOn: number, allowMultiple?: boolean, inherit?: boolean ): UDecoratorFunctionType_ForClass
    {
        return AttributeDecorate( new CAttributeUsage( validOn, allowMultiple, inherit ) );
    }
}

