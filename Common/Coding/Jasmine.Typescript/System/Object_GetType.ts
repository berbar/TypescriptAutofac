

/// <reference path="./Reflection/Type.ts" />

interface Object
{
    GetType(): iberbar.System.Reflection.CType< Object >;
}

Object.prototype.GetType = function(): iberbar.System.Reflection.CType< Object >
{
    return iberbar.System.Reflection.TypeOf__( <iberbar.System.Reflection.TypePrototype<object>>Reflect.getPrototypeOf( this ) );
}

/**
 * 不可枚举
 */
Reflect.defineProperty( Object.prototype, "GetType", { enumerable: false } );



const TypeOf = iberbar.System.Reflection.TypeOf;
const DeclaringType = iberbar.System.Reflection.DeclaringType;
