
/// <reference path="./CAttributeUsageAttribute.ts" />


namespace System
{
    export function AttributeDecorate( attribute: CAttribute ): UDecoratorFunctionType
    {
        return ( target: any, propertyName?: string | symbol, descriptorOrParameterIndex?: PropertyDescriptor | number ) =>
        {
            let attributeUsage = attribute.GetType().GetCustomAttributeOne( Reflection.TypeOf( CAttributeUsageAttribute ), true );
            if ( attributeUsage == null )
            {
                attributeUsage = CAttributeUsageAttribute.DefaultUsage;
            }
            if ( propertyName == undefined )
            {
                propertyName = "constructor";
                if ( descriptorOrParameterIndex == null )
                {
                    CAttributeDecorateHelper.DecorateClass( attribute, attributeUsage, target );
                }
                else if ( typeof( descriptorOrParameterIndex ) == "object" )
                {
                    CAttributeDecorateHelper.DecorateMethod( attribute, attributeUsage, target, propertyName, descriptorOrParameterIndex.value );
                }
                else if ( typeof( descriptorOrParameterIndex ) == "number" )
                {
                    CAttributeDecorateHelper.DecorateParameter( attribute, attributeUsage, target.prototype, propertyName, descriptorOrParameterIndex );
                }
            }
            else
            {
                if ( descriptorOrParameterIndex == null )
                {
                    CAttributeDecorateHelper.DecorateField( attribute, attributeUsage, target, propertyName );
                }
                else if ( typeof( descriptorOrParameterIndex ) == "object" )
                {
                    if ( descriptorOrParameterIndex.set == undefined && descriptorOrParameterIndex.get == undefined )
                    {
                        CAttributeDecorateHelper.DecorateMethod( attribute, attributeUsage, target, propertyName, descriptorOrParameterIndex.value );
                    }
                    else
                    {
                        CAttributeDecorateHelper.DecorateProperty( attribute, attributeUsage, target, propertyName );
                    }
                }
                else
                {
                    CAttributeDecorateHelper.DecorateParameter(
                        attribute,
                        attributeUsage,
                        target.prototype,
                        propertyName,
                        descriptorOrParameterIndex );
                }
            }
        };
    }


    export var Attribute = AttributeDecorate;

    class CAttributeDecorateHelper
    {
        public static uSymbolForConstruc: USymbol = "Jasmine::System:Attribute";

        public static DecorateClass(
            attribute: CAttribute,
            usage: CAttributeUsageAttribute,
            targetConstructor: Reflection.TypeConstructor< object > ): void
        {
            CAttributeDecorateHelper.CheckTargetValidOn( attribute, usage, UAttributeTarget.Class );
            let key = new Metadata.Core.CMetadataKeyForClass( Reflection.TypeOf__( targetConstructor.prototype ), UAttributeTarget.Class );
            Metadata.Container.GetOrAddCollection( key ).AddAttribute( attribute );
        }

        public static DecorateField(
            attribute: CAttribute,
            usage: CAttributeUsageAttribute,
            targetPrototype: Reflection.TypePrototype< object >,
            fieldName: string | symbol ): void
        {
            CAttributeDecorateHelper.CheckTargetValidOn( attribute, usage, UAttributeTarget.Field );
            let key = new Metadata.Core.CMetadataKeyForNamed( Reflection.TypeOf__( targetPrototype ), UAttributeTarget.Field, fieldName );
            Metadata.Container.GetOrAddCollection( key ).AddAttribute( attribute );
        }

        public static DecorateProperty(
            attribute: CAttribute,
            usage: CAttributeUsageAttribute,
            targetPrototype: Reflection.TypePrototype< object >,
            propertyName: string | symbol ): void
        {
            CAttributeDecorateHelper.CheckTargetValidOn( attribute, usage, UAttributeTarget.Property );
            let key = new Metadata.Core.CMetadataKeyForNamed( Reflection.TypeOf__( targetPrototype ), UAttributeTarget.Property, propertyName );
            Metadata.Container.GetOrAddCollection( key ).AddAttribute( attribute );
        }

        public static DecorateMethod(
            attribute: CAttribute,
            usage: CAttributeUsageAttribute,
            targetPrototype: Reflection.TypePrototype< object >,
            methodName: string | symbol,
            method: Function ): void
        {
            CAttributeDecorateHelper.CheckTargetValidOn( attribute, usage, UAttributeTarget.Method );
            let key = new Metadata.Core.CMetadataKeyForNamed( Reflection.TypeOf__( targetPrototype ), UAttributeTarget.Method, methodName );
            Metadata.Container.GetOrAddCollection( key ).AddAttribute( attribute );
        }

        public static DecorateParameter(
            attribute: CAttribute,
            usage: CAttributeUsageAttribute,
            targetPrototype: Reflection.TypePrototype< object >,
            methodName: string | symbol,
            parameterIndex: number,
        ): void
        {
            CAttributeDecorateHelper.CheckTargetValidOn( attribute, usage, UAttributeTarget.Parameter );
            let key = new Metadata.Core.CMetadataKeyForParameter( Reflection.TypeOf__( targetPrototype ), UAttributeTarget.Parameter, methodName, parameterIndex );
            Metadata.Container.GetOrAddCollection( key ).AddAttribute( attribute );
        }

        public static CheckTargetValidOn( attribute: CAttribute, usage: CAttributeUsageAttribute, target: UAttributeTarget ): void
        {
            if ( usage != null && (usage.ValidOn & target) != target )
            {
                throw new Error( `Can't use ${attribute.constructor.name} to decorate ${UAttributeTarget[target]}`  );
            }
        }
    }
}
