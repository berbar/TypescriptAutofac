

namespace iberbar.Autofac.Activators.Reflection
{
    export class CDefaultValueParameter extends Core.CParameter
    {
        public CanSupplyValue(pi: System.Reflection.CParameterInfo, context: IComponentContext): { ret: boolean; valueProvider?: () => object; }
        {
            return {
                ret: true,
                valueProvider: () => null
            };
        }
        // public CanSupplyValue(
        //     pi: System.Reflection.CParameterInfo,
        //     context: IComponentContext,
        //     valueProvider: System.OutParameter<() => object>
        // ): boolean
        // {
        //     valueProvider.__out = () => null;
        //     return true;
        // }
    }
}