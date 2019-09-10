

namespace Ioc.Features.Scanning
{
    export class CScanningRegistrationExtensions
    {
        public static RegisterAssemblyTypes( containerBuilder: CContainerBuilder, assemblies: System.Reflection.CAssembly[] ): Builder.IRegistrationBuilder
        {
            let rb = new Builder.CRegistrationBuilder(
                new Core.CTypedService( System.Reflection.TypeOf( Object ) ),
                new Builder.CScanningActivatorData(),
                {} );
            rb.RegisterData.DeferredCallback = containerBuilder.RegisterCallback( System.__Callback( function( this: CContainerBuilder, cr )
            {
                CScanningRegistrationExtensions.ScanAssemblies( assemblies, cr, rb );
            }))
            return rb;
        }

        public static RegisterTypes( containerBuilder: CContainerBuilder, types: System.Reflection.CType[] ): Builder.IRegistrationBuilder
        {
            let rb = new Builder.CRegistrationBuilder(
                new Core.CTypedService( System.Reflection.TypeOf( Object ) ),
                new Builder.CScanningActivatorData(),
                {} );
            rb.RegisterData.DeferredCallback = containerBuilder.RegisterCallback( System.__Callback( function( this: CContainerBuilder, cr )
            {
                CScanningRegistrationExtensions.ScanTypes( types, cr, rb );
            }))
            return rb;
        }

        private static ScanAssemblies( assemblies: System.Reflection.CAssembly[], componentRegistry: Core.IComponentRegistry, registrationBuilder: Builder.IRegistrationBuilder ): void
        {
            let types: System.Reflection.CType[] = [];
            for ( const assembly of assemblies )
            {
                types = types.concat( assembly.GetTypes() );
            }
            this.ScanTypes( types, componentRegistry, registrationBuilder );
        }

        private static ScanTypes( types: System.Reflection.CType[], componentRegistry: Core.IComponentRegistry, registrationBuilder: Builder.IRegistrationBuilder ): void
        {
            let activatorData: Builder.CScanningActivatorData = <Builder.CScanningActivatorData>registrationBuilder.ActivatorData;
            let filters = activatorData.Filters;
            for ( const t of types )
            {
                let fit = true;
                for ( const filterTemp of filters )
                {
                    if ( filterTemp( t ) == false )
                    {
                        fit = false;
                        break;
                    }
                }
                if ( fit == false )
                    continue;
                let scanned = new Builder.CRegistrationBuilder(
                    new Core.CTypedService( t ),
                    new Builder.CConcreteReflectionActivatorData( t ),
                    new Builder.CSingleRegistrationStyle() );

                scanned.RegisterData.CopyFrom( registrationBuilder.RegisterData, false );

                for ( const action of activatorData.ConfigurationActions )
                {
                    action( t, scanned );
                }

                if ( scanned.RegisterData.GetServices().length > 0 )
                    Builder.CRegistrationBuilderHelper.RegisterSingleComponent( componentRegistry, scanned );
            }
        }

        public static As( registrationBuilder: Builder.IRegistrationBuilder, serviceMapping: ( t: System.Reflection.CType ) => Core.CService[] ): Builder.IRegistrationBuilder
        {
            let activatorData: Builder.CScanningActivatorData = <Builder.CScanningActivatorData>registrationBuilder.ActivatorData;
            activatorData.ConfigurationActions.push( function( type, rb )
            {
                let mapped = serviceMapping( type );
                let impl = (<Builder.CConcreteReflectionActivatorData>rb.ActivatorData).ImplementationType;
                let applied: Core.CService[] = [];
                for ( const s of mapped )
                {
                    let c = <Core.IServiceWithType><any>s;
                    if ( c[ "GetServiceType" ] != undefined )
                    {
                        if ( impl.IsInheritFrom( c.GetServiceType() ) || impl.IsEquivalentTo( c.GetServiceType() ) )
                        {
                            applied.push( s );
                        }
                    }
                }
                rb.AsEx( applied );
            });
            return registrationBuilder;
        }
    }
}