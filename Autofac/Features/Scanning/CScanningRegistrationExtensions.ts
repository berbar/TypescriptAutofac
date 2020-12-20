

namespace iberbar.Autofac.Features.Scanning
{
    export class CScanningRegistrationExtensions
    {
        public static RegisterAssemblyTypes( containerBuilder: CContainerBuilder, assemblies: ReadonlyArray< System.Reflection.CAssembly > ): Builder.IRegistrationBuilder<object>
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

        public static RegisterTypes( containerBuilder: CContainerBuilder, types: ReadonlyArray< System.Reflection.CType > ): Builder.IRegistrationBuilder<object>
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

        private static ScanAssemblies( assemblies: ReadonlyArray< System.Reflection.CAssembly >, componentRegistry: Core.IComponentRegistry, registrationBuilder: Builder.IRegistrationBuilder<object> ): void
        {
            let types: System.Reflection.CType[] = [];
            for ( let i = 0; i < assemblies.length; i ++ )
            {
                let assembly = assemblies[ i ];
                types = types.concat( assembly.GetTypes() );
            }
            this.ScanTypes( types, componentRegistry, registrationBuilder );
        }

        private static ScanTypes( types: ReadonlyArray< System.Reflection.CType >, componentRegistry: Core.IComponentRegistry, registrationBuilder: Builder.IRegistrationBuilder<object> ): void
        {
            let activatorData: Builder.CScanningActivatorData = <Builder.CScanningActivatorData>registrationBuilder.ActivatorData;
            let filters = activatorData.Filters;
            for ( let i = 0; i < types.length; i ++ )
            {
                let t = types[ i ];
                let fit = true;
                for ( let j = 0; j < filters.length; j ++ )
                {
                    let filterTemp = filters[ j ];
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

                for ( let j = 0; j < activatorData.ConfigurationActions.length; j ++ )
                {
                    let action = activatorData.ConfigurationActions[ j ];
                    action( t, scanned );
                }

                if ( scanned.RegisterData.GetServices().length > 0 )
                    Builder.CRegistrationBuilderHelper.RegisterSingleComponent( componentRegistry, scanned );
            }
        }

        public static As( registrationBuilder: Builder.IRegistrationBuilder<object>, serviceMapping: ( t: System.Reflection.CType ) => Core.CService[] ): Builder.IRegistrationBuilder<object>
        {
            let activatorData: Builder.CScanningActivatorData = <Builder.CScanningActivatorData>registrationBuilder.ActivatorData;
            activatorData.ConfigurationActions.push( function( type, rb )
            {
                let mapped = serviceMapping( type );
                let impl = (<Builder.CConcreteReflectionActivatorData>rb.ActivatorData).ImplementationType;
                let applied: Core.CService[] = [];
                for ( let i = 0; i < mapped.length; i ++ )
                {
                    let s = mapped[ i ];
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