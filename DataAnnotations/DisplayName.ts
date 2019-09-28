

namespace iberbar.DataAnnotations
{
    export namespace Core
    {
        export class CDisplayName extends System.CAttribute
        {
            protected readonly m_name: string = null;

            public constructor( name: string )
            {
                super();
                this.m_name = name;
            }

            public get Name(): string
            {
                return this.m_name;
            }
        }
    }

    export function DisplayName( name: string ): System.UDecoratorFunctionType_ForField
    {
        return System.AttributeDecorate( new Core.CDisplayName( name ) );
    }
}