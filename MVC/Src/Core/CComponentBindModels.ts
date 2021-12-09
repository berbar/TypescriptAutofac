

namespace iberbar.MVC.Core
{
    export class CComponentBindModels implements IComponentInit
    {
        public InitView( view: CView ): void
        {
            let binder = view.LifetimeScope.Resolve( System.Reflection.TypeOf( CViewModelBinder ) );
            let viewType = view.GetType();
            let fieldInfos = viewType.GetFields();
            for ( let i = 0; i < fieldInfos.length; i ++ )
            {
                let field = fieldInfos[ i ];
                if ( field.IsDefined( System.Reflection.TypeOf( Attributes.CViewModelAttribute ) ) == false )
                    continue;

                if ( field.FieldType == null )
                    continue;

                let model = view.LifetimeScope.Resolve( field.FieldType );
                binder.BindModel( view, model );
                field.SetValue( view, model );
            }
        }

        public ReInitView( view: CView ): void
        {
            this.InitView( view );
        }
    }
}