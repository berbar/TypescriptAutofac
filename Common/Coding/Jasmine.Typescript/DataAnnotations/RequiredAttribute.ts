

/// <reference path="./ValidationAttribute.ts" />


namespace iberbar.DataAnnotations
{
    export namespace Core
    {
        export class CRequiredAttribute extends CValidationAttribute
        {
            protected m_allowEmptyStrings: boolean = null;

            public constructor( options: CRequiredAttribute.UOptions )
            {
                super( options );
                this.m_allowEmptyStrings = ( options.allowEmptyStrings == true ) ? true : false;
            }

            public set AllowEmptyStrings( value: boolean )
            {
                this.m_allowEmptyStrings = value;
            }

            public get AllowEmptyStrings(): boolean
            {
                return this.m_allowEmptyStrings;
            }

            public Validate( value: any, validationContext: CValidationContext ): boolean
            {
                if ( value == null || value == undefined )
                    return false;
                if ( this.m_allowEmptyStrings == false && typeof( value ) == "string" && value == "" )
                    return false;
                return true;
            }
        }

        export namespace CRequiredAttribute
        {
            export type UOptions =
            {
                allowEmptyStrings?: boolean;
            } & CValidationAttribute.UOptions;
        }
    }

    export function Required( options: Core.CRequiredAttribute.UOptions ): System.UDecoratorFunctionType_ForField
    {
        return System.AttributeDecorate( new Core.CRequiredAttribute( options ) );
    }
}