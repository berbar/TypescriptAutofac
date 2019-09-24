
/// <reference path="./Core/CConstantParameter.ts" />


namespace iberbar.Autofac
{
    export class CTypedParameter extends Core.CConstantParameter
    {
        private readonly m_type: System.Reflection.CType = null;

        public constructor( type: System.Reflection.CType, value: object )
        {
            super( value, pi => pi.ParameterType && pi.ParameterType.IsEquivalentTo( type ) );
            this.m_type = type;
        }

        public get Type(): System.Reflection.CType
        {
            return this.m_type;
        }
    }
}