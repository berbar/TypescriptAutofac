

namespace iberbar.MVC.KernelJquery.Components
{
    class CModelBinderInternal
    {
        private m_view: CView = null;
        private m_modelType: System.Reflection.CType = null;
        private m_model: object = null;
        
        public constructor( view: CView, model: object )
        {
            this.m_view = view;
            this.m_modelType = model.GetType();
            this.m_model = model;
        }

        public Bind(): void
        {
            let componentDependOnViews = this.m_view.GetComponent( System.Reflection.TypeOf( CComponentDependOnViews ) );
            this.BindPropertiesWithElementsAndViews( componentDependOnViews == null ? null : componentDependOnViews.Views );
        }

        private BindPropertiesWithElementsAndViews( viewList: CComponentDependOnViews.InitResult ): void
        {
            let fieldInfos = this.m_modelType.GetFields();
            for ( let i = 0; i < fieldInfos.length; i ++ )
            {
                let fi = fieldInfos[ i ];
                // 绑定DOM元素
                let attrFromElement = fi.GetCustomAttributeOne( System.Reflection.TypeOf( Attributes.FromElementAttribute ) );
                if ( attrFromElement != null )
                {
                    this.BindFieldWithElement( fi, attrFromElement );
                    continue;
                }

                // 绑定视图
                let attrFromView = fi.GetCustomAttributeOne( System.Reflection.TypeOf( Attributes.FromViewAttribute ) );
                if ( attrFromView != null )
                {
                    this.BindFieldWithView( fi, viewList, attrFromView );
                    continue;
                }
            }
            
        }

        private BindFieldWithView( fieldInfo: System.Reflection.CFieldInfo, viewList: CComponentDependOnViews.InitResult, howGetFromView: Attributes.FromViewAttribute ): void
        {
            let attrDeclaringType = fieldInfo.GetCustomAttributeOne( System.Reflection.TypeOf( System.Reflection.CDeclaringTypeAttribute ) );
            if ( attrDeclaringType == null )
                return;
            
            let isArray: boolean = false;
            let viewType: System.Reflection.CType = null;

            let bindType = fieldInfo.FieldType;
            if ( bindType.IsInheritFrom( System.Reflection.TypeOf( Array ) ) )
            {
                if ( attrDeclaringType.GenericTypes.length != 1 )
                {
                    console.warn( "" );
                    return;
                }
                if ( attrDeclaringType.GenericTypes[ 0 ].IsInheritFrom( System.Reflection.TypeOf( CView ) ) == false )
                {
                    console.warn( "" );
                    return;
                }

                isArray = true;
                viewType = attrDeclaringType.GenericTypes[ 0 ];
            }
            else if ( bindType.IsInheritFrom( System.Reflection.TypeOf( CView ) ) )
            {
                isArray = false;
                viewType = bindType;
            }
            else
            {
                console.warn( "" );
                return;
            }

            if ( isArray == true )
            {
                let viewListTemp: Array< CView > = Array();
                for ( let i = 0; i < viewList.length; i ++ )
                {
                    let viewListNode = viewList[ i ];
                    if ( viewListNode.viewType.IsEquivalentTo( viewType ) == false )
                        continue;
                    viewListTemp.push( viewListNode.viewInstance );
                }
                fieldInfo.SetValue( this.m_model, viewListTemp );
            }
            else
            {
                for ( let i = 0; i < viewList.length; i ++ )
                {
                    let viewListNode = viewList[ i ];
                    if ( viewListNode.viewType.IsEquivalentTo( viewType ) )
                    {
                        if ( howGetFromView.Tag != null )
                        {
                            if ( howGetFromView.Tag == viewListNode.tag ||
                                ( (<System.IEquatable<any>>howGetFromView.Tag).Equals != null && (<System.IEquatable<any>>howGetFromView.Tag).Equals( viewListNode.tag ) ) )
                            {
                                fieldInfo.SetValue( this.m_model, viewListNode.viewInstance );
                                break;
                            }
                        }
                        else
                        {
                            fieldInfo.SetValue( this.m_model, viewListNode.viewInstance );
                            break;
                        }
                    }
                }
            }
        }

        private BindFieldWithElement( fieldInfo: System.Reflection.CFieldInfo, attrFromElement: Attributes.FromElementAttribute ): void
        {
            let elementWhere: JQuery = null;
            if ( attrFromElement.FromBody == true )
            {
                elementWhere = $( document.body ).find( attrFromElement.SelectorText );
            }
            else
            {
                if ( attrFromElement.SelectorText == null )
                    elementWhere = this.m_view.GetElementRoot();
                else
                    elementWhere = this.m_view.GetElementRoot().find( attrFromElement.SelectorText );
            }
            fieldInfo.SetValue( this.m_model, elementWhere );
        }
    }

    export class CViewModelBinder extends MVC.Core.CViewModelBinder
    {
        public BindModel( view: CView, model: object ): void
        {
            new CModelBinderInternal( view, model ).Bind();
        }
    }
}