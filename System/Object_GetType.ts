

/// <reference path="./Reflection/Type.ts" />

interface Object
{
    GetType(): System.Reflection.CType< Object >;
}

Object.prototype.GetType = function(): System.Reflection.CType< Object >
{
    return System.Reflection.TypeOf__( <System.Reflection.TypePrototype<object>>Reflect.getPrototypeOf( this ) );
}

/**
 * 不可枚举
 */
Reflect.defineProperty( Object.prototype, "GetType", { enumerable: false } );
