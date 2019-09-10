

namespace Autofac.Core.Registration
{
    export class CComponentRegistry implements IComponentRegistry
    {
        private readonly m_registrations: IComponentRegistration[] = [];

        private readonly m_serviceInfo: System.Collections.Generic.IDictionary< CService, CServiceRegistrationInfo > = new System.Collections.Generic.CDictionary< CService, CServiceRegistrationInfo >( { comparer: new CServiceEqualityComparer() } );

        constructor()
        {

        }
        
        GetProperties(): { [key: string]: object; } {
            throw new Error("Method not implemented.");
        }
        
        GetRegistration(service: CService): IComponentRegistration
        {
            let info = this.m_serviceInfo.Get( service );
            if ( info == null )
                return null;
            let componentRegistration = info.GetRegistration();
            return componentRegistration;
        }

        IsRegistered(service: CService): boolean {
            throw new Error("Method not implemented.");
        }

        Register( registration: IComponentRegistration, preserveDefaults?: boolean ): void
        {
            this.AddRegistration( registration, preserveDefaults );
        }

        GetRegistrations(): Array< IComponentRegistration > {
            throw new Error("Method not implemented.");
        }

        GetRegistrationsFor(service: CService): Array< IComponentRegistration > {
            throw new Error("Method not implemented.");
        }

        AddRegistrationSource(source: IRegistrationSource): void {
            throw new Error("Method not implemented.");
        }

        GetRegistrationSources(): Array< IRegistrationSource > {
            throw new Error("Method not implemented.");
        }

        HasLocalComponents(): boolean {
            throw new Error("Method not implemented.");
        }

        Dispose(): void {
            throw new Error("Method not implemented.");
        }

        private AddRegistration( registration: IComponentRegistration, preserveDefaults: boolean, originatedFromSource: boolean = false ): void
        {
            let services = registration.Services;
            for ( const s of services )
            {
                let info = this.GetServiceInfo( s );
                info.AddImplementation( registration, preserveDefaults, originatedFromSource );
            }
            this.m_registrations.push( registration );
        }

        private GetServiceInfo( service: CService ): CServiceRegistrationInfo
        {
            let info = this.m_serviceInfo.Get( service );
            if ( info != null )
                return info;
            info = new CServiceRegistrationInfo( service );
            this.m_serviceInfo.Add( service, info );
            return info;
        }
    }
}