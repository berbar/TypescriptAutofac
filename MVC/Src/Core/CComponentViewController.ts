namespace iberbar.MVC.Core
{
    @System.Reflection.AutoReflectMetadata_Constructor
    @System.Reflection.TypeNickname( "iberbar::Mvc::ViewComponents::CInitComponent_ViewController" )
    export class CInitComponent_ViewController implements IComponentInit, System.IDisposable
    {
        private m_binderResults: Array< IActionBinderResult > = null;

        public InitView( view: CView ): void
        {
            let viewType = view.GetType();
            let controllerTypeAttributes = viewType.GetCustomAttributes( TypeOf( MVC.Attributes.CAddControllerAttribute ), true );
            if ( controllerTypeAttributes.length == 0 )
                return;

            this.m_binderResults = Array();
            for ( let i = 0; i < controllerTypeAttributes.length; i ++ )
            {
                let attribute = controllerTypeAttributes[ i ];
                let binder = view.LifetimeScope.Resolve( System.Reflection.TypeOf( CActionBinder ) );
                let binderResult = binder.BindActions( view, attribute.ControllerType );
                this.m_binderResults.push( binderResult );
            }
        }

        public ReInitView( view: CView ): void
        {
            if ( this.m_binderResults != null && this.m_binderResults.length > 0 )
            {
                for ( let i = 0; i < this.m_binderResults.length; i ++ )
                {
                    let r = this.m_binderResults[ i ];
                    r.Dispose();
                }
                this.m_binderResults = null;
            }

            this.InitView( view );
        }

        public Dispose(): void
        {
            if ( this.m_binderResults != null && this.m_binderResults.length > 0 )
            {
                for ( let i = 0; i < this.m_binderResults.length; i ++ )
                {
                    let r = this.m_binderResults[ i ];
                    r.Dispose();
                }
                this.m_binderResults = null;
            }
        }
    };
}