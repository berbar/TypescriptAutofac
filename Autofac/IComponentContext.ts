
namespace Ioc
{
    export interface IComponentContext
    {
        readonly ComponentRegistry: Core.IComponentRegistry;

        ResolveComponent( registration: Core.IComponentRegistration, parameters: Core.CParameter[] ): object;
    }
}