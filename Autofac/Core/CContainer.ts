

namespace Ioc.Core
{
    export class CContainer implements IContainer
    {

        private readonly m_rootLifetimeScope: ILifetimeScope = null;
        private readonly m_componentRegistry: IComponentRegistry = null;

        public constructor()
        {
            this.m_componentRegistry = new Registration.CComponentRegistry();
            this.m_componentRegistry.Register( new Registration.CComponentRegistration(
                Lifetime.CLifetimeScope.SelfRegistrationId,
                new Activators.Delegate.CDelegateActivator( System.Reflection.TypeOf( Object ), () => { throw new Error(); } ),
                new Lifetime.CCurrentScopeLifetime(),
                UInstanceSharing.Shared,
                null,
                [ new CLifetimeScopeService() ],
                null
            ));
            this.m_rootLifetimeScope = new Lifetime.CLifetimeScope( this.m_componentRegistry, null, null );
        }

        GetTag(): ULifetimeScopeTagType {
            throw new Error("Method not implemented.");
        }
        BeginLifetimeScope(tag?: ULifetimeScopeTagType): ILifetimeScope {
            return this.m_rootLifetimeScope.BeginLifetimeScope( tag );
        }
        Dispose(): void {
            this.m_rootLifetimeScope.Dispose();
        }

        public get ComponentRegistry(): Core.IComponentRegistry
        {
            return this.m_componentRegistry;
        }

        ResolveComponent(registration: IComponentRegistration, parameters: CParameter[]): object
        {
            return this.m_rootLifetimeScope.ResolveComponent( registration, parameters );
        }

        Resolve<TService extends object>(type: System.Reflection.CType<TService>, ...parameters: CParameter[]): TService
        {
            return this.m_rootLifetimeScope.Resolve( type, ...parameters );
        }

        ResolveNamed<TService extends object>( type: System.Reflection.CType<TService>, name: string, ...parameters: CParameter[] ): TService
        {
            return this.m_rootLifetimeScope.ResolveNamed( type, name, ...parameters );
        }
        
        ResolveKeyed<TService extends object, TKey>(type: System.Reflection.CType<TService>, key: TKey, ...parameters: CParameter[]): TService
        {
            return this.m_rootLifetimeScope.ResolveKeyed( type, key, ...parameters );
        }

        public GetDisposer(): IDisposer
        {
            return this.m_rootLifetimeScope.GetDisposer();
        }
    }
}