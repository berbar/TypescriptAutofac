

namespace iberbar.Autofac.Builder
{
    export class CRegistrationBuilderHelper
    {
        public static RegisterSingleComponent(
            cr: Core.IComponentRegistry,
            rb: IRegistrationBuilder<object> ): void
        {
            let registration = this.CreateRegistrationForBuilder( rb );
            cr.Register( registration, false );
        }

        public static CreateRegistrationForBuilder(
            rb: IRegistrationBuilder<object> ): Core.IComponentRegistration
        {
            return this.CreateRegistration(
                rb.RegistrationStyle.ID,
                rb.RegisterData,
                rb.ActivatorData.GetActivator(),
                rb.RegisterData.GetServices()
            );
        }

        public static CreateRegistration(
            id: string,
            data: CRegistrationData,
            activator: Core.IInstanceActivator,
            services: Array< Core.CService >,
            target?: Core.IComponentRegistration ): Core.IComponentRegistration
        {
            let limitType = activator.GetLimitType();
            
            for ( const ts of services )
            {
                if ( ts.hasOwnProperty( "GetServiceType" ) == false )
                    continue;
                
                if ( limitType.IsInheritFrom( ((<Core.IServiceWithType><any>ts)).GetServiceType() ) == false )
                {
                    throw new Error( "" );
                }
            }

            let registration = new Core.Registration.CComponentRegistration(
                id,
                activator,
                data.Lifetime,
                data.Sharing,
                null,
                data.GetServices(),
                null,
                target
            );

            registration.Activating.Add( data.ActivatingHandlers.callbacks );
            
            return registration;
        }
    }
}