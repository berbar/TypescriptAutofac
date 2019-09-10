

namespace Network.Socket.Decorators
{
    export class CReceiveMethodAttribute extends System.CAttribute
    {
        private readonly m_name: string = null;

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

    export function ReceiveMethod( name?: string ): System.UDecoratorFunctionType_ForClass & System.UDecoratorFunctionType_ForMethod
    {
        return System.AttributeDecorate( new CReceiveMethodAttribute( name ) );
    }
}