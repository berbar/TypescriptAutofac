

namespace iberbar.Autofac.Core
{
    export class CResolvedParameter extends CParameter
    {
        public CanSupplyValue(pi: System.Reflection.CParameterInfo, context: IComponentContext): { ret: boolean; valueProvider?: () => object; }
        {
            throw new Error("Method not implemented.");
        }
    }
}