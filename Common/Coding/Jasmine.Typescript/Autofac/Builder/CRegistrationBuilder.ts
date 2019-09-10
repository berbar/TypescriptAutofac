

namespace Ioc.Builder
{
    export class CRegistrationBuilder implements IRegistrationBuilder
    {
        protected m_registrationData: CRegistrationData = null;
        protected m_activatorData: IActivatorData = null;
        protected m_registrationStyle: any = null;

        public constructor( service: Core.CService, activatorData: IActivatorData, style: any )
        {
            this.m_registrationData = new CRegistrationData( service );
            this.m_activatorData = activatorData;
            this.m_registrationStyle = style;
        }

        public get RegisterData(): CRegistrationData
        {
            return this.m_registrationData;
        }

        public get ActivatorData(): IActivatorData
        {
            return this.m_activatorData;
        }

        GetActivatorDataEx<T extends object >( t: System.Reflection.TypeConstructor< T > ): T
        {
            if ( this.m_activatorData instanceof t )
            {
                return this.m_activatorData;
            }
            return null;
        }

        public get RegistrationStyle(): any
        {
            return this.m_registrationStyle;
        }

        Named<TService extends object>(type: System.Reflection.CType<TService>, name: string): IRegistrationBuilder
        {
            this.m_registrationData.AddService( new Core.CKeyedService( name, type ) );
            return this;
        }

        Keyed<TService extends object>( type: System.Reflection.CType<TService>, key: any ): IRegistrationBuilder
        {
            this.m_registrationData.AddService( new Core.CKeyedService( key, type ) );
            return this;
        }

        KeyedMapping< TService extends object >( type: System.Reflection.CType< TService >, servicesKeyMapping: ( type: System.Reflection.CType ) => any ): IRegistrationBuilder
        {
            if ( this.m_activatorData instanceof CScanningActivatorData )
            {
                this.m_activatorData.Filters.push( t => t.IsInheritFrom( type ) );
                this.__As2( t => new Core.CKeyedService( servicesKeyMapping( t ), type ) );
            }
            else if ( this.m_activatorData instanceof CConcreteReflectionActivatorData )
            {
                this.m_registrationData.AddService( new Core.CKeyedService( servicesKeyMapping( this.m_activatorData.ImplementationType ), this.m_activatorData.ImplementationType ) );
            }
            return this;
        }

        As<TService extends object>(type: System.Reflection.CType<TService>): IRegistrationBuilder
        {
            this.m_registrationData.AddService( new Core.CTypedService( type ) );
            return this;
        }

        AsEx( services: Core.CService[] ): IRegistrationBuilder
        {
            this.m_registrationData.AddServices( services );
            return this;
        }

        private __As1( serviceMapping: ( t: System.Reflection.CType ) => System.Reflection.CType ): IRegistrationBuilder
        {
            return this.__As2( t => new Core.CTypedService( serviceMapping( t ) ) );   
        }

        private __As2( serviceMapping: ( t: System.Reflection.CType ) => Core.CService ): IRegistrationBuilder
        {
            return this.__As3( t => [ serviceMapping( t ) ] );
        }

        private __As3( serviceMapping: ( t: System.Reflection.CType ) => Core.CService[] ): IRegistrationBuilder
        {
            return Features.Scanning.CScanningRegistrationExtensions.As( this, serviceMapping );
        }

        AsSelf(): IRegistrationBuilder
        {
            if ( this.m_activatorData instanceof CScanningActivatorData )
            {
                this.__As1( t => t );
            }
            else if ( this.m_activatorData instanceof CConcreteReflectionActivatorData )
            {
                this.m_registrationData.AddService( new Core.CTypedService( this.m_activatorData.ImplementationType ) );
            }
            //return this.__As( this.m_activatorData.GetTypes() );
            return this;
        }

        public Where( predicate: ( type: System.Reflection.CType ) => boolean ): IRegistrationBuilder
        {
            if ( ( this.m_activatorData instanceof Builder.CScanningActivatorData ) == false )
                throw new Error();

            (<Builder.CScanningActivatorData>this.m_activatorData).Filters.push( predicate );

            return this;
        }

        SingleInstance(): IRegistrationBuilder
        {
            this.m_registrationData.Sharing = Core.UInstanceSharing.Shared;
            this.m_registrationData.Lifetime = new Core.Lifetime.CRootScopeLifetime();
            return this;
        }

        InstancePerDependency(): IRegistrationBuilder
        {
            this.m_registrationData.Sharing = Core.UInstanceSharing.None;
            this.m_registrationData.Lifetime = new Core.Lifetime.CCurrentScopeLifetime();
            return this;
        }

        InstancePerLifetimeScope(): IRegistrationBuilder
        {
            this.m_registrationData.Sharing = Core.UInstanceSharing.Shared;
            this.m_registrationData.Lifetime = new Core.Lifetime.CCurrentScopeLifetime();
            return this;
        }

        InstancePerMatchingLifetimeScope( ...scopeTag: ULifetimeScopeTagType[] ): IRegistrationBuilder
        {
            this.m_registrationData.Sharing = Core.UInstanceSharing.Shared;
            this.m_registrationData.Lifetime = new Core.Lifetime.CMatchingScopeLifetime( ...scopeTag );
            return this;
        }

        PropertiesAutowired( propertySelector?: Core.IPropertySelector ): IRegistrationBuilder
        {
            if ( propertySelector == undefined )
            {
                propertySelector = new Core.CDefaultPropertySelector( false );
            }
            this.m_registrationData.ActivatingHandlers.Add( ( sender, e ) =>
            {
                Activators.Reflection.CAutowiringPropertyInjector.InjectProperties( e.Context, e.Instance, propertySelector, e.Parameters );
            });
            return this;
        }

        public WithParameter( parameter: Core.CParameter ): IRegistrationBuilder
        {
            let activatorData = this.GetActivatorDataEx( CReflectionActivatorData );
            if ( activatorData != null )
            {
                activatorData.ConfiguredParameters.push( parameter );
            }
            return this;
        }

        public WithParameters( parameters: ReadonlyArray< Core.CParameter > ): IRegistrationBuilder
        {
            for ( const p of parameters )
                this.WithParameter( p );
            return this;
        }

        public WithProperty( parameter: Core.CParameter ): IRegistrationBuilder
        {
            let activatorData = this.GetActivatorDataEx( CReflectionActivatorData );
            if ( activatorData != null )
                activatorData.ConfiguredProperties.push( parameter );
            return this;
        }

        public WithProperties( parameters: ReadonlyArray< Core.CParameter > ): IRegistrationBuilder
        {
            for ( const p of parameters )
                this.WithProperty( p );
            return this;
        }
    }
}