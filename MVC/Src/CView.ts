


namespace iberbar.MVC
{
    export abstract class CView implements System.IDisposable
    {
        private m_id: string = null;

        private m_componentKernel: Core.CComponentKernel<any> = null;
        private m_components: Array< object > = Array();
        
        /**
         * autofac注入
         */
        private m_lifetimeScope: iberbar.Autofac.ILifetimeScope = null;
        @iberbar.Autofac.InjectLifetimeScope()
        public set LifetimeScope( value: iberbar.Autofac.ILifetimeScope )
        {
            this.m_lifetimeScope = value;
        }
        public get LifetimeScope()
        {
            return this.m_lifetimeScope;
        }

        constructor()
        {
        }

        public set ID( id: string )
        {
            this.m_id = id;
        }

        public get ID()
        {
            return this.m_id;
        }

        public Create( ...args: any[] ): any
        {
            this.ResolveComponents();
            let ret = this.InitComponentKernel( ...args );
            this.InitComponents();
            this.OnCreated();
            return ret;
        }

        public ReCreate(): any
        {
            try
            {
                this.m_componentKernel.ReCreate( this );
            }
            catch ( error )
            {
                console.error( `Failed to initialize the kernel component of type <${this.m_componentKernel.GetType().GetNickname()}>` );
                console.error( error.stack );
            }

            this.InitComponents();
            this.OnCreated();
        }

        protected OnCreated(): void
        {
        }

        protected InitComponentKernel( ...args: any[] ): any
        {
            try
            {
                return this.m_componentKernel.Create( this, ...args );
            }
            catch ( error )
            {
                console.error( `Failed to initialize the kernel component of type <${this.m_componentKernel.GetType().GetNickname()}>` );
                console.error( error.stack );
            }
        }

        protected ResolveComponents(): void
        {
            let mapper = this.GetMapper();
            let type = < System.Reflection.CType< CView > >this.GetType();

            let componentKernelType = mapper.GetComponentKernelType();
            this.m_componentKernel = this.LifetimeScope.Resolve( componentKernelType, new Autofac.CTypedParameter( System.Reflection.TypeOf( CView ), this ) );

            let componentTypes = mapper.GetComponentTypes( type );
            let attributesDisabled = type.GetCustomAttributes( System.Reflection.TypeOf( Attributes.CDisableViewComponentAttribute ), true );
            for ( let i = 0; i < componentTypes.length; i ++ )
            {
                let componentType = componentTypes[ i ];

                let parameters: Array< Autofac.Core.CParameter > = [
                    new Autofac.CTypedParameter( TypeOf( CView ), this )
                ];

                if ( componentType == null )
                    continue;

                if ( attributesDisabled.FirstOrDefault( ad => ad.ComponentType.IsEquivalentTo( componentType ) ) != null )
                    continue;

                if ( this.m_components.FirstOrDefault( c => c.GetType().IsEquivalentTo( componentType ) ) != null )
                {
                    console.error( `duplicate type of component(${componentType.GetNickname()}) for view<${type.GetNickname()}>.` );
                    continue;
                }

                let component: object = null;
                try
                {
                    component = this.LifetimeScope.Resolve( componentType, ...parameters );
                }
                catch ( error )
                {
                    console.error( `Can't resolve instance of component type(${componentType.GetNickname()}) for view<${type.GetNickname()}>` );
                    console.error( error.stack );
                }

                if ( component != null )
                {
                    this.m_components.push( component );
                }
            }
        }

        protected InitComponents(): void
        {
            let type = this.GetType();
            for ( let i = 0; i < this.m_components.length; i ++ )
            {
                let component = this.m_components[ i ];

                if ( (<Core.IComponentInit>component).InitView != undefined )
                {
                    try
                    {
                        (<Core.IComponentInit>component).InitView( this );
                    }
                    catch ( error )
                    {
                        console.error( `Exception occurred when the component(${component.GetType().GetNickname()}) initialized for view<${type.GetNickname()}>.` );
                        console.error( error.stack );
                    }
                }
            }
        }

        public GetComponentKernel< T extends ( ...args: any[] ) => any >(): Core.CComponentKernel< T >
        {
            return <Core.CComponentKernel<T>>this.m_componentKernel;
        }

        public GetComponent< T extends object >( type: System.Reflection.CType< T > ): T
        {
            return <T>this.m_components.FirstOrDefault( t => t.GetType().IsEquivalentTo( type ) );
        }

        public Show(): void
        {
            this.GetComponentKernel().Show( this.__Callback( this.OnShow ) );
        }

        public Hide(): void
        {
            this.GetComponentKernel().Hide( this.__Callback( this.OnHide ) );
        }

        public FadeIn( duration?: number ): void
        {
            this.GetComponentKernel().FadeIn( duration, this.__Callback( this.OnShow ) );
        }

        public FadeOut( duration?: number ): void
        {
            this.GetComponentKernel().FadeOut( duration, this.__Callback( this.OnHide ) );
        }

        public IsShow(): boolean
        {
            return this.GetComponentKernel().IsShow();
        }

        public GetMapper(): Core.CMapper
        {
            return this.LifetimeScope.Resolve( System.Reflection.TypeOf( Core.CMapper ) );
        }

        public Dispose(): void
        {
            for ( let i = 0; i < this.m_components.length; i ++ )
            {
                let c = this.m_components[ i ];

                if ( (<System.IDisposable>c).Dispose != null )
                {
                    (<System.IDisposable>c).Dispose();
                }
            }
            if ( this.m_componentKernel != null )
            {
                this.m_componentKernel.Dispose();
            }
        }

        protected OnShow(): void
        {
        }

        protected OnHide(): void
        {
        }
    };
}