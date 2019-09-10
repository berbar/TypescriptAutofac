


namespace DataAnnotations
{
    export namespace Core
    {
        export class CValidationAttribute extends System.CAttribute
        {
            protected m_errorText: string = null;
    
            public constructor( options: CValidationAttribute.UOptions )
            {
                super();
                this.m_errorText = options.errorText;
            }
    
            public get ErrorText(): string
            {
                return this.m_errorText;
            }
    
            public FormatErrorMessage( name: string ): string
            {
                return this.m_errorText.replace( /\{(name)\}/, name );
            }
    
            public Validate( value: any, validationContext: CValidationContext ): boolean
            {
                throw new Error('Not implements');
            }
        }

        export namespace CValidationAttribute
        {
            export type UOptions =
            {
                errorText: string;
            }
        }
    }
}
