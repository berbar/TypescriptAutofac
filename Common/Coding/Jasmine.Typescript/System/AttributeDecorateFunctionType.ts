

namespace System
{
    export type UDecoratorFunctionType_ForClass = ClassDecorator;
    export type UDecoratorFunctionType_ForField = PropertyDecorator;
    export type UDecoratorFunctionType_ForMethod = MethodDecorator;
    export type UDecoratorFunctionType_ForParameter = ParameterDecorator;
    export type UDecoratorFunctionType_ForProperty = MethodDecorator;
    export type UDecoratorFunctionType =
        UDecoratorFunctionType_ForClass &
        UDecoratorFunctionType_ForField &
        UDecoratorFunctionType_ForMethod &
        UDecoratorFunctionType_ForParameter &
        UDecoratorFunctionType_ForProperty;
}