

namespace Autofac.Core.Resolving
{
    export interface IResolveOperation
    {
        GetOrCreateInstance( currentLifetimeScope: ISharingLifetimeScope, registration: IComponentRegistration, parameters: CParameter[] ): object;
    }
}