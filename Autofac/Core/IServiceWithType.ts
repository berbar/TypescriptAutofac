

namespace iberbar.Autofac.Core
{
    export interface IServiceWithType
    {
        GetServiceType(): System.Reflection.CType;

        ChangeType( newType: System.Reflection.CType ): CService;
    }
}