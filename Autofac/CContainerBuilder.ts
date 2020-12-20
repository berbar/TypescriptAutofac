

namespace iberbar.Autofac
{
    export class CContainerBuilder
    {
        private m_wasBuilt: boolean = false;
        private readonly m_configurationCallbacks: Array< Builder.CDeferredCallback > = Array();

        public Register< T extends object >(
            type: System.Reflection.CType< T >,
            delegate: System.TCallbackOrFunction< Activators.Delegate.UActivationFunction< T > >
        ): Builder.IRegistrationBuilder< T >
        {
            let rb = new Builder.CRegistrationBuilder(
                new Core.CTypedService( System.Reflection.TypeOf( Object ) ),
                new Builder.CSimpleActivatorData( new Activators.Delegate.CDelegateActivator( type, delegate ) ),
                new Builder.CSingleRegistrationStyle()
            );
            rb.RegisterData.DeferredCallback = this.RegisterCallback( System.__Callback( function( cr )
            {
                Builder.CRegistrationBuilderHelper.RegisterSingleComponent( cr, rb );
            }));
            return rb;
        }

        public RegisterType< T extends object >( type: System.Reflection.CType< T > ): Builder.IRegistrationBuilder< T >
        {
            let rb = new Builder.CRegistrationBuilder(
                new Core.CTypedService( type ),
                new Builder.CConcreteReflectionActivatorData( type ),
                new Builder.CSingleRegistrationStyle() );
            rb.RegisterData.DeferredCallback = this.RegisterCallback( System.__Callback( function( cr )
            {
                Builder.CRegistrationBuilderHelper.RegisterSingleComponent( cr, rb );
            }));
            return rb;
        }

        public RegisterInstance< T extends object >( type: System.Reflection.CType< T >, instance: T ): Builder.IRegistrationBuilder<T>
        {
            let activator = new Activators.ProvidedInstance.CProvidedInstanceActivator( instance );
            let rb = new Builder.CRegistrationBuilder(
                new Core.CTypedService( type ),
                new Builder.CSimpleActivatorData( activator ),
                new Builder.CSingleRegistrationStyle() );
            rb.SingleInstance();
            rb.RegisterData.DeferredCallback = this.RegisterCallback( System.__Callback( function( cr )
            {
                if ( ( rb.RegisterData.Lifetime instanceof Core.Lifetime.CRootScopeLifetime ) == false ||
                    rb.RegisterData.Sharing != Core.UInstanceSharing.Shared )
                {
                    throw new Error();
                }

                // Dispose控制
                // 暂不实现

                // 
                Builder.CRegistrationBuilderHelper.RegisterSingleComponent( cr, rb );
            }));
            return rb;
        }

        /**
         * 可以访问注册类中类；
         * 
         * 只能注册export的类型;
         * 
         * @param assemblies 
         */
        public RegisterAssemblyTypes( ...assemblies: ReadonlyArray< System.Reflection.CAssembly > ): Builder.IRegistrationBuilder<object>
        {
            return Features.Scanning.CScanningRegistrationExtensions.RegisterAssemblyTypes( this, assemblies );
        }

        public RegisterTypes( types: ReadonlyArray< System.Reflection.CType > ): Builder.IRegistrationBuilder<object>
        {
            return Features.Scanning.CScanningRegistrationExtensions.RegisterTypes( this, types );
        }

        public RegisterCallback( configurationCallback: System.Action< Core.IComponentRegistry > ): any
        {
            let c = new Builder.CDeferredCallback( configurationCallback );
            this.m_configurationCallbacks.push( c );
            return c;
        }

        public Build(): IContainer
        {
            let container = new Core.CContainer();
            this.BuildInternal( container.ComponentRegistry );

            return container;
        }

        private BuildInternal( componentRegistry: Core.IComponentRegistry ): void
        {
            if ( this.m_wasBuilt == true )
                throw new Error();

            this.m_wasBuilt = true;

            for ( let i = 0; i < this.m_configurationCallbacks.length; i ++ )
            {
                let callback = this.m_configurationCallbacks[ i ];
                callback.Callback.Execute( componentRegistry );
            }
        }
    };
}