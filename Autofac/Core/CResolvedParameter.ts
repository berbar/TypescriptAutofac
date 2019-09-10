

namespace Ioc.Core
{
    export class CResolvedParameter extends CParameter
    {
        public CanSupplyValue(
            pi: System.Reflection.CParameterInfo,
            context: IComponentContext,
            valueProvider: System.OutParameter<() => object>
        ): boolean
        {
            throw new Error("Method not implemented.");
        }
        
    }
}