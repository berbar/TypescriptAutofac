


namespace Ioc.Core
{
    export abstract class CParameter
    {
        public abstract CanSupplyValue(
            pi: System.Reflection.CParameterInfo,
            context: IComponentContext,
            valueProvider: System.OutParameter< () => object >
        ) : boolean;
    }
}

