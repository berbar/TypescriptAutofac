

namespace iberbar.MVC.Core
{
    @System.Reflection.AutoReflectMetadata_Constructor
    @System.Reflection.TypeNickname( "iberbar::MVC::Components::CComponentBindActions" )
    export class CComponentBindActions implements IComponentInit, System.IDisposable
    {
        private m_binderResult: IActionBinderResult = null;

        public InitView( view: CView ): void
        {
            let binder = view.LifetimeScope.Resolve( System.Reflection.TypeOf( CActionBinder ) );
            this.m_binderResult = binder.BindActions( view, null );
        }

        public ReInitView( view: CView ): void
        {
            this.m_binderResult.Dispose();
            this.m_binderResult = null;
            this.InitView( view );
        }

        public Dispose(): void
        {
            this.m_binderResult.Dispose();
        }
    }
}

