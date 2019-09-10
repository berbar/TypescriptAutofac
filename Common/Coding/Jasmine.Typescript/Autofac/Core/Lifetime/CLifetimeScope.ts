

namespace Autofac.Core.Lifetime
{
    export class CLifetimeScope implements ISharingLifetimeScope
    {
        private readonly m_componentRegistry: IComponentRegistry = null;
        private readonly m_lifetimeScopeRoot: ISharingLifetimeScope = null;
        private readonly m_lifetimeScopeParent: ISharingLifetimeScope = null;
        private readonly m_tag: ULifetimeScopeTagType = null;
        private readonly m_disposer: IDisposer = new CDisposer();

        private m_sharedInstances: System.Collections.Generic.IDictionary< string, object > = new System.Collections.Generic.CDictionary();

        public static readonly SelfRegistrationId = Core.GenID();

        public constructor( componentRegistry: IComponentRegistry, lifetimeScopeParent: CLifetimeScope, tag: ULifetimeScopeTagType )
        {
            this.m_componentRegistry = componentRegistry;
            this.m_lifetimeScopeParent = lifetimeScopeParent;
            if ( this.m_lifetimeScopeParent == null )
            {
                this.m_lifetimeScopeRoot = this;
                this.m_tag = CLifetimeScope.RootTag;
            }
            else
            {
                if ( tag == null )
                    throw new Error();
                this.m_lifetimeScopeRoot = lifetimeScopeParent.GetRootLifetimeScope();
                this.m_tag = tag;
            }

            // 保存自己的ID
            this.m_sharedInstances.Add( CLifetimeScope.SelfRegistrationId, this );
        }

        private static RootTag: ULifetimeScopeTagType = "root";

        private static MakeAnonymousTag(): ULifetimeScopeTagType
        {
            return Symbol();
        }

        public GetParentLifetimeScope(): ISharingLifetimeScope
        {
            return this.m_lifetimeScopeParent;
        }

        public GetRootLifetimeScope(): ISharingLifetimeScope
        {
            return this.m_lifetimeScopeRoot;
        }

        public GetOrCreateAndShare( id: string, creator: System.TCallback< () => object > ): object
        {
            let instance = this.m_sharedInstances.Get( id );
            if ( instance != null )
                return instance;

            instance = creator.Execute();

            this.m_sharedInstances.Add( id, instance );
            
            return instance;
        }

        public BeginLifetimeScope( tag?: ULifetimeScopeTagType ): ILifetimeScope
        {
            if ( tag == undefined )
            {
                return this.BeginLifetimeScope( CLifetimeScope.MakeAnonymousTag() );
            }

            this.CheckTagIsUnique( tag );

            let scope = new CLifetimeScope( this.m_componentRegistry, this, tag );
            return scope;
        }
        
        public get ComponentRegistry(): IComponentRegistry
        {
            return this.m_componentRegistry;
        }


        public ResolveComponent(registration: IComponentRegistration, parameters: CParameter[]): object
        {
            this.CheckNotDisposed();
            let operation = new Resolving.CResolveOperation( this );
            return operation.Execute( registration, parameters );
        }

        Resolve<TService extends object>( type: System.Reflection.CType<TService>, ...parameters: CParameter[] ): TService
        {
            let instance: System.OutParameter< object > = { __out: null };
            let succeed = this.TryResolveService( new CTypedService( type ), parameters, instance );
            if ( succeed == false )
            {
                throw new Error();
            }
            return <TService>instance.__out;
        }

        ResolveNamed<TService extends object>( type: System.Reflection.CType<TService>, name: string, ...parameters: CParameter[] ): TService
        {
            let instance: System.OutParameter< object > = { __out: null };
            let succeed = this.TryResolveService( new CKeyedService( name, type ), parameters, instance );
            if ( succeed == false )
            {
                throw new Error();
            }
            return <TService>instance.__out;
        }

        ResolveKeyed<TService extends object, TKey>( type: System.Reflection.CType<TService>, key: TKey, ...parameters: CParameter[] ): TService
        {
            let instance: System.OutParameter< object > = { __out: null };
            let succeed = this.TryResolveService( new CKeyedService( key, type ), parameters, instance );
            if ( succeed == false )
            {
                throw new Error();
            }
            return <TService>instance.__out;
        }

        private TryResolveService( service: CService, parameters: CParameter[], instance: System.OutParameter< object > ): boolean
        {
            let registration = this.ComponentRegistry.GetRegistration( service );
            if ( registration == null )
            {
                instance.__out = null;
                return false;
            }
            instance.__out = this.ResolveComponent( registration, parameters );
            return true;
        }

        public Dispose(): void
        {
            this.m_disposer.Dispose();
            this.m_sharedInstances.Clear();
        }

        public GetTag() : ULifetimeScopeTagType
        {
            return this.m_tag;
        }

        private CheckTagIsUnique( tag: ULifetimeScopeTagType ): void
        {
            let scopeParent: ISharingLifetimeScope = this;
            while ( scopeParent )
            {
                if ( scopeParent.GetTag() == tag )
                {
                    throw new Error( "" );
                }
                scopeParent = scopeParent.GetParentLifetimeScope();
            }
        }

        private CheckNotDisposed(): void
        {
        }

        public GetDisposer(): IDisposer
        {
            return this.m_disposer;
        }
    }
}