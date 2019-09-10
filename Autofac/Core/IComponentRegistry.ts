

namespace Autofac.Core
{
    export interface IComponentRegistry extends System.IDisposable
    {
        GetProperties(): { [ key: string ]: object };

        GetRegistration( service: CService ): IComponentRegistration;

        IsRegistered( service: CService ): boolean;

        Register( registration: Core.IComponentRegistration, preserveDefaults?: boolean ): void;

        GetRegistrations(): Array< IComponentRegistration >;

        GetRegistrationsFor( service: CService ): Array< IComponentRegistration >;

        AddRegistrationSource( source: IRegistrationSource ): void;

        GetRegistrationSources(): Array< IRegistrationSource >;

        HasLocalComponents(): boolean;
    }
}