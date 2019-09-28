

namespace iberbar.DataAnnotations
{
    export class CValidationResult
    {
        protected m_errorText: string = null;

        public constructor( errorText: string )
        {
            this.m_errorText = errorText;
        }

        public toString(): string
        {
            return this.m_errorText;
        }
    }
}