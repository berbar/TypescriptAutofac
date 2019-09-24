
/// <reference path="./CParameter.ts" />


namespace iberbar.Autofac.Core
{
    export abstract class CConstantParameter extends CParameter
    {
        private readonly m_predicate: ( parameterInfo: System.Reflection.CParameterInfo ) => boolean = null;

        private readonly m_value: object = null;

        public constructor( value: object, predicate: ( parameterInfo: System.Reflection.CParameterInfo ) => boolean )
        {
            super();
            this.m_predicate = predicate;
            this.m_value = value;
        }

        public get Value(): object
        {
            return this.m_value;
        }

        public CanSupplyValue(
            pi: System.Reflection.CParameterInfo,
            context: IComponentContext
        ): { ret: boolean, valueProvider?: () => object }
        {
            if (this.m_predicate(pi))
            {
                return {
                    ret: true,
                    valueProvider: () => this.Value
                };
            }

            return {
                ret: false
            };
        }
        
    }
}