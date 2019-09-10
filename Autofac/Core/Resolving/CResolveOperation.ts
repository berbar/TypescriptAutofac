

namespace Autofac.Core.Resolving
{
    export class CResolveOperation implements IComponentContext, IResolveOperation
    {
        private readonly m_mostNestedLifetimeScope: ISharingLifetimeScope = null;

        public constructor( mostNestedLifetimeScope: ISharingLifetimeScope )
        {
            this.m_mostNestedLifetimeScope = mostNestedLifetimeScope;
        }

        public get ComponentRegistry(): IComponentRegistry
        {
            return this.m_mostNestedLifetimeScope.ComponentRegistry;
        }

        ResolveComponent(registration: IComponentRegistration, parameters: CParameter[]): object
        {
            return this.GetOrCreateInstance( this.m_mostNestedLifetimeScope, registration, parameters );
        }

        Execute( registration: IComponentRegistration, parameters: CParameter[] ): object
        {
            let result: any = null;
            try
            {
                result = this.ResolveComponent( registration, parameters );
            }
            catch ( e )
            {
                throw e;
            }
            return result;
        }

        GetOrCreateInstance( currentLifetimeScope: ISharingLifetimeScope, registration: IComponentRegistration, parameters: CParameter[] ): object
        {
            let lookup = new CInstanceLookup( registration, this, currentLifetimeScope, parameters );
            let instance = lookup.Execute();
            return instance;
        }
    }
}