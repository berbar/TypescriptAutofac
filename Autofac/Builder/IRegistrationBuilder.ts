

namespace iberbar.Autofac.Builder
{
    export interface IRegistrationBuilder<TLimit extends object>
    {
        readonly RegisterData: CRegistrationData;

        readonly ActivatorData: IActivatorData;

        readonly RegistrationStyle: any;

        Named< TService extends object >( type: System.Reflection.CType< TService >, name: string ): IRegistrationBuilder<TLimit>;

        Keyed< TService extends object >( type: System.Reflection.CType< TService >, key: any ): IRegistrationBuilder<TLimit>;

        KeyedMapping< TService extends object >( type: System.Reflection.CType< TService >, servicesKeyMapping: ( type: System.Reflection.CType ) => any ): IRegistrationBuilder<TLimit>;

        As< TService extends object >( type: System.Reflection.CType< TService > ): IRegistrationBuilder<TLimit>;

        AsEx( services: Core.CService[] ): IRegistrationBuilder<TLimit>;

        AsSelf(): IRegistrationBuilder<TLimit>;

        Where( predicate: ( type: System.Reflection.CType ) => boolean ): IRegistrationBuilder<TLimit>;

        SingleInstance(): IRegistrationBuilder<TLimit>;

        InstancePerDependency(): IRegistrationBuilder<TLimit>;

        InstancePerLifetimeScope(): IRegistrationBuilder<TLimit>;

        InstancePerMatchingLifetimeScope( scopeTag: ULifetimeScopeTagType ): IRegistrationBuilder<TLimit>;

        PropertiesAutowired( propertySelector?: Core.IPropertySelector, allowCircularDependencies?: boolean ): IRegistrationBuilder<TLimit>;

        WithParameter( parameter: Core.CParameter ): IRegistrationBuilder<TLimit>;

        WithParameters( parameters: ReadonlyArray< Core.CParameter > ): IRegistrationBuilder<TLimit>;

        WithProperty( parameter: Core.CParameter ): IRegistrationBuilder<TLimit>;

        WithProperties( parameters: ReadonlyArray< Core.CParameter > ): IRegistrationBuilder<TLimit>;

        OnActivating( callback: Core.UCallbackActivating<TLimit> ): IRegistrationBuilder<TLimit>;

        OnActivated(): IRegistrationBuilder<TLimit>;
    };
}

