
namespace Autofac.Core.Resolving
{
    export class CInstanceLookup implements IComponentContext, IInstanceLookup
    {
        private readonly m_registration: IComponentRegistration = null;

        private readonly m_context: IResolveOperation = null;

        private readonly m_activationScope: ISharingLifetimeScope = null;

        private readonly m_parameters: CParameter[] = null;

        private m_executed: boolean = false;

        private m_newInstance: object = null;

        public constructor(
            registration: IComponentRegistration,
            context: IResolveOperation,
            mostNestedVisibleScope: ISharingLifetimeScope,
            parameters: CParameter[]
        )
        {
            this.m_registration = registration;
            this.m_context = context;
            this.m_parameters = parameters;
            try
            {
                this.m_activationScope = this.m_registration.Lifetime.FindScope( mostNestedVisibleScope );
            }
            catch ( e )
            {
                throw e;
            }
        }

        GetComponentRegistration(): IComponentRegistration {
            return this.m_registration
        }

        GetActivationScope(): ILifetimeScope {
            return this.m_activationScope;
        }

        GetParameters(): CParameter[] {
            return this.m_parameters;
        }

        public get ComponentRegistry(): IComponentRegistry
        {
            return this.m_activationScope.ComponentRegistry;
        }

        ResolveComponent(registration: IComponentRegistration, parameters: CParameter[]): object {
            return this.m_context.GetOrCreateInstance( this.m_activationScope, registration, parameters );
        }

        Execute(): object
        {
            if ( this.m_executed == true )
                throw new Error();

            this.m_executed = true;

            let instance: any = null;

            if ( this.m_registration.Sharing == UInstanceSharing.None )
            {
                instance = this.Activate( this.m_parameters );
            }
            else
            {
                instance = this.m_activationScope.GetOrCreateAndShare( this.m_registration.ID, this.__Callback( () => this.Activate( this.m_parameters ) ) );
            }

            return instance;
        }

        private Activate( parameters: CParameter[] ): object
        {
            try
            {
                this.m_newInstance = this.m_registration.Activator.ActivateInstance( this, parameters );
            }
            catch (error)
            {
                throw error;
            }

            // dispose
            if ( (<any>this.m_newInstance)[ "Dispose" ] != undefined )
            {
                this.m_activationScope.GetDisposer().AddInstanceForDisposal( <any>this.m_newInstance );
            }

            this.m_newInstance = this.m_registration.RaiseActivating( this, parameters, this.m_newInstance );

            return this.m_newInstance;
        }
    }
}