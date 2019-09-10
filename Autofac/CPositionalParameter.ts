
/// <reference path="./Core/CConstantParameter.ts" />


namespace Ioc
{
    export class CPositionalParameter extends Core.CConstantParameter
    {
        private readonly m_position: number = null;

        public constructor( position: number, value: object )
        {
            super( value, pi => pi.ParameterIndex == position );
            this.m_position = position;
        }

        public get Position(): number
        {
            return this.m_position;
        }
    }
}