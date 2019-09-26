
/// <reference path="../UAttributeTarget.ts" />
/// <reference path="../CAttribute.ts" />
/// <reference path="../AttributeUsage.ts" />


namespace iberbar.System.Reflection
{
    @AttributeUsage( UAttributeTarget.Parameter, false, false )
    export class CNamedAttribute extends CAttribute
    {
        private readonly m_text: string = null;

        public constructor( text: string )
        {
            super();
            this.m_text = text;
        }

        public get Text(): string
        {
            return this.m_text;
        }
    }

    export function Named( text: string ): UDecoratorFunctionType_ForParameter
    {
        return AttributeDecorate( new CNamedAttribute( text ) );
    }
}
