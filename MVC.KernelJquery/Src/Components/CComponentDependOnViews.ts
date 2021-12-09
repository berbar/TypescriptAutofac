

namespace iberbar.MVC.KernelJquery.Components
{
    @System.Reflection.AutoReflectMetadata_Constructor
    @System.Reflection.TypeNickname( "iberbar::MVC::KernelJquery::Components::CComponentDependOnViews" )
    export class CComponentDependOnViews implements Core.IComponentInit
    {
        private m_viewsDependOn: CComponentDependOnViews.InitResult = Array();

        public InitView( view: CView ): void
        {
            let viewProvider = view.LifetimeScope;
            let attrList_ViewDependOn = view.GetType().GetCustomAttributes( System.Reflection.TypeOf( Attributes.CDependOnViewAttribute ), false );
            if ( attrList_ViewDependOn != null && attrList_ViewDependOn.length > 0 )
            {
                for ( let i = 0; i < attrList_ViewDependOn.length; i ++ )
                {
                    let attr = attrList_ViewDependOn[ i ];
                    let viewTemp = viewProvider.Resolve( attr.ViewType );
                    if ( viewTemp == null )
                    {
                        throw new Error( `can't resolve view of type "${attr.ViewType.GetNickname()}"` );
                    }
                    let elementWhere: JQuery = null;
                    if ( attr.FromBody == true )
                    {
                        elementWhere = $( document.body );
                    }
                    else
                    {
                        if ( attr.SelectorText == null )
                            elementWhere = view.GetElementRoot();
                        else
                            elementWhere = view.GetElementRoot().find( attr.SelectorText );
                    }
                    viewTemp.Create( elementWhere, attr.CreateMethod );
                    this.m_viewsDependOn.push( {
                        tag: attr.Tag,
                        viewType: attr.ViewType,
                        viewInstance: viewTemp
                    });
                }
            }
        }

        ReInitView( view: CView ): void
        {
            if ( this.m_viewsDependOn.length > 0 )
            {
                for ( let i = 0; i < this.m_viewsDependOn.length; i ++ )
                {
                    let vd = this.m_viewsDependOn[ i ];
                    vd.viewInstance.Dispose();
                }
                this.m_viewsDependOn = Array();
            }
            this.InitView( view );
        }

        public get Views(): any
        {
            return this.m_viewsDependOn;
        }
    };


    export namespace CComponentDependOnViews
    {
        export type InitResult = Array<
        {
            tag: any;
            viewType: System.Reflection.CType< CView >;
            viewInstance: CView;
        } >;
    }
}