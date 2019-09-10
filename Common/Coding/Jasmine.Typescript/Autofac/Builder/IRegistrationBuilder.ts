

namespace Autofac.Builder
{
    export interface IRegistrationBuilder
    {
        readonly RegisterData: CRegistrationData;

        readonly ActivatorData: IActivatorData;

        readonly RegistrationStyle: any;

        Named< TService extends object >( type: System.Reflection.CType< TService >, name: string ): IRegistrationBuilder;

        Keyed< TService extends object >( type: System.Reflection.CType< TService >, key: any ): IRegistrationBuilder;

        KeyedMapping< TService extends object >( type: System.Reflection.CType< TService >, servicesKeyMapping: ( type: System.Reflection.CType ) => any ): IRegistrationBuilder;

        As< TService extends object >( type: System.Reflection.CType< TService > ): IRegistrationBuilder;

        AsEx( services: Core.CService[] ): IRegistrationBuilder;

        AsSelf(): IRegistrationBuilder;

        Where( predicate: ( type: System.Reflection.CType ) => boolean ): IRegistrationBuilder;

        SingleInstance(): IRegistrationBuilder;

        InstancePerDependency(): IRegistrationBuilder;

        InstancePerLifetimeScope(): IRegistrationBuilder;

        InstancePerMatchingLifetimeScope( scopeTag: ULifetimeScopeTagType ): IRegistrationBuilder;

        PropertiesAutowired( propertySelector?: Core.IPropertySelector, allowCircularDependencies?: boolean ): IRegistrationBuilder;

        WithParameter( parameter: Core.CParameter ): IRegistrationBuilder;

        WithParameters( parameters: ReadonlyArray< Core.CParameter > ): IRegistrationBuilder;

        WithProperty( parameter: Core.CParameter ): IRegistrationBuilder;

        WithProperties( parameters: ReadonlyArray< Core.CParameter > ): IRegistrationBuilder;
    };
}

