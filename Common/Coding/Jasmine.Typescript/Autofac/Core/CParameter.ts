


namespace iberbar.Autofac.Core
{
    export abstract class CParameter
    {
        public abstract CanSupplyValue(
            pi: System.Reflection.CParameterInfo,
            context: IComponentContext
        ): { ret: boolean, valueProvider?: () => object }
    }
}

