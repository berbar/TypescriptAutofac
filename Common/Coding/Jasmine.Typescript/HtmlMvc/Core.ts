

namespace iberbar.Mvc
{
    var uAllocateID: number = 0;
    export function AllocateID(): string
    {
        uAllocateID++;
        return "Jasmie_Mvc_" + uAllocateID;
    }

    export class CDataModel
    {

    }

    export class CViewModel
    {
        /**
         * 从视图中获取JQuery元素
         * @param view 
         */
        public GetElementsFromView( view: CView ): void
        {
            let elementRoot = view.GetElementRoot()
            let modelType = this.GetType();
            let fieldInfos = modelType.GetFields();
            for ( const fi of fieldInfos )
            {
                let attrFromElement = fi.GetCustomAttributeOne( System.Reflection.TypeOf( Attributes.FromElementAttribute ) );
                if ( attrFromElement == null )
                    continue;
                let elementWhere: JQuery = null;
                if ( attrFromElement.FromBody == true )
                {
                    elementWhere = $( document.body ).find( attrFromElement.SelectorText );
                }
                else
                {
                    if ( attrFromElement.SelectorText == null )
                        elementWhere = elementRoot;
                    else
                        elementWhere = elementRoot.find( attrFromElement.SelectorText );
                }
                fi.SetValue( this, elementWhere );
            }
        }

        /**
         * 将data数据反射到当前的ViewModel中
         * @param data 数据
         */
        public FromObject( data: any ): void
        {
            let modelType = this.GetType();
            let fieldInfos = modelType.GetFields();
            for ( const fi of fieldInfos )
            {
                let attrFromElement = fi.GetCustomAttributeOne( System.Reflection.TypeOf( Attributes.FromElementAttribute ) );
                if ( attrFromElement == null )
                    continue;
                let element: JQuery = fi.GetValue( this );
                if ( element == null || element.length == 0 )
                    continue;
                let dataValue = data[ fi.Name ];
                let dataType = typeof( dataValue );
                if ( dataValue == null )
                    continue;
                if ( dataType == "boolean" )
                {
                    element.prop( "checked", dataValue );
                }
                else if ( dataType == "string" || dataType == "number" )
                {
                    element.val( dataValue );
                }
            }
            let propertyInfos = modelType.GetProperties();
            for ( const pi of propertyInfos )
            {
                let dataValue = data[ pi.Name ];
                let dataType = typeof( dataValue );
                if ( dataValue == null )
                    continue;
                pi.SetValue( this, dataValue );
            }
        }

        /**
         * 将当前的ViewModel模型反射到数据
         * @param type 数据类型
         */
        public ToObject< T extends object >( type: System.Reflection.CType< T > ): T
        {
            let obj = type.GetConstructor().Invoke();
            let modelType = this.GetType();
            let fieldInfos = modelType.GetFields();
            for ( const fi of fieldInfos )
            {
                let attrFromElement = fi.GetCustomAttributeOne( System.Reflection.TypeOf( Attributes.FromElementAttribute ) );
                if ( attrFromElement == null )
                    continue;
                let fi_obj = type.GetFieldOne( fi.Name );
                if ( fi_obj == null )
                    continue;
                let attrDeclaringType = fi_obj.GetCustomAttributeOne( System.Reflection.TypeOf( System.Reflection.CDeclaringTypeAttribute ) );
                if ( attrDeclaringType == null )
                    continue;
                let element = <JQuery>fi.GetValue( this );
                let dataValueType = attrDeclaringType.DeclaringType;
                let dataValue: any = null;
                if ( dataValueType.IsEquivalentTo( System.Reflection.TypeOf( Number ) ) )
                {
                    dataValue = Number( element.val() );
                    if ( Number.isNaN( dataValue ) )
                        dataValue = null;
                }
                else if ( dataValueType.IsEquivalentTo( System.Reflection.TypeOf( String ) ) )
                {
                    dataValue = element.val().toString();
                }
                else if ( dataValueType.IsEquivalentTo( System.Reflection.TypeOf( Boolean ) ) )
                {
                    dataValue = element.prop( "checked" );
                }
                fi_obj.SetValue( obj, dataValue );
            }
            return <T>obj;
        }
    }

    export abstract class CView
    {
        protected m_elementRoot: JQuery = null;

        protected m_controller: CViewController = null;

        protected m_uniqueId: string = null;
        protected m_id: string = null;

        
        /**
         * autofac注入
         */
        protected m_lifetimeScope: iberbar.Autofac.ILifetimeScope = null;
        @iberbar.Autofac.InjectLifetimeScope()
        public set LifetimeScope( value: iberbar.Autofac.ILifetimeScope )
        {
            this.m_lifetimeScope = value;
        }

        constructor()
        {
            let attrSetController = this.GetType().GetCustomAttributeOne( System.Reflection.TypeOf( Attributes.SetControllerAttribute ), false );
            if ( attrSetController != null )
            {
                let controllerConstructor = attrSetController.ControllerType.GetConstructor();
                this.m_controller = controllerConstructor.Invoke();
            }
        }

        public ResetController( type: System.Reflection.CType<CViewController> ): void
        {
            if ( type == null )
                this.m_controller = null;
            else
            {
                let controllerConstructor = type.GetConstructor();
                this.m_controller = controllerConstructor.Invoke();
            }
            if ( this.m_elementRoot != null )
            {
                this.ReBindActions();
            }
        }

        public set ID( id: string )
        {
            this.m_id = id;
        }

        public get ID()
        {
            return this.m_id;
        }

        public Destroy(): void
        {
        }

        public Create( element: JQuery, method: CView.UCreateMethod ): void
        {
            this.m_uniqueId = AllocateID();
            let strHTML = this.ReturnHTML();
            let classes = this.ReturnClasses();
            let strClasses = "";
            if ( classes != null && classes.length > 0 )
            {
                for ( const cls of classes )
                {
                    strClasses += cls + " ";
                }
                strClasses = `class="${strClasses}"`;
            }
            strHTML = `<div id="${this.m_uniqueId}" ${strClasses}>${strHTML}</div>`;
            if ( method == CView.UCreateMethod.Append )
            {
                this.m_elementRoot = element.append( strHTML ).find( "#" + this.m_uniqueId );
            }
            else if ( method == CView.UCreateMethod.Before )
            {
                this.m_elementRoot = element.before( strHTML ).parent().find( "#" + this.m_uniqueId );
            }
            else
            {
                this.m_elementRoot = element.after( strHTML ).parent().find( "#" + this.m_uniqueId );
            }

            let viewList = this.CreateViewsDependOn();
            this.ReBindPropertiesWithElementsAndViews( viewList );
            this.ReBindActions();

            this.OnCreated();
        }

        protected abstract ReturnHTML(): string;

        protected abstract ReturnClasses(): string[];

        protected OnCreated(): void
        {
        }

        protected GetController< T extends CViewController = CViewController >(): T
        {
            return <T>this.m_controller;
        }

        protected CreateViewsDependOn(): CView.UDependViewList
        {
            let viewList: CView.UDependViewList = Array();
            let viewProvider = GetIoc();
            let attrList_ViewDependOn = this.GetType().GetCustomAttributes( System.Reflection.TypeOf( Attributes.DependOnViewAttribute ), false );
            if ( attrList_ViewDependOn != null && attrList_ViewDependOn.length > 0 )
            {
                for ( const attr of attrList_ViewDependOn )
                {
                    let view = viewProvider.Resolve( attr.ViewType );
                    if ( view == null )
                    {
                        throw new Error( `can't resolve view of type "${attr.ViewType.GetJsConstructor().name}"` );
                    }
                    let elementWhere: JQuery = null;
                    if ( attr.FromBody == true )
                    {
                        elementWhere = $( document.body );
                    }
                    else
                    {
                        if ( attr.SelectorText == null )
                            elementWhere = this.m_elementRoot;
                        else
                            elementWhere = this.m_elementRoot.find( attr.SelectorText );
                    }
                    view.Create( elementWhere, attr.CreateMethod );
                    viewList.push( {
                        viewType: attr.ViewType,
                        viewInstance: view
                    });
                }
            }
            return viewList;
        }

        protected ReBindPropertiesWithElementsAndViews( viewList: CView.UDependViewList ): void
        {
            let fieldInfos = this.GetType().GetFields();
            for ( const fi of fieldInfos )
            {
                // 绑定视图模型
                let attrViewModel = fi.GetCustomAttributeOne( System.Reflection.TypeOf( Attributes.CViewModelAttribute ) );
                if ( attrViewModel != null )
                {
                    this.BindFieldWithViewModel( fi, attrViewModel );
                    continue;
                }

                // 绑定视图
                let attrFromView = fi.GetCustomAttributeOne( System.Reflection.TypeOf( Attributes.FromViewAttribute ) );
                if ( attrFromView != null )
                {
                    this.BindFieldWithView( fi, attrFromView, viewList );
                    continue;
                }

                // 绑定DOM元素
                let attrFromElement = fi.GetCustomAttributeOne( System.Reflection.TypeOf( Attributes.FromElementAttribute ) );
                if ( attrFromElement != null )
                {
                    this.BindFieldWithElement( fi, attrFromElement );
                    continue;
                }
            }
            
        }
        
        protected BindFieldWithViewModel( fieldInfo: System.Reflection.CFieldInfo, attributeViewModel: Attributes.CViewModelAttribute ): void
        {
            let attrDeclaringType = fieldInfo.GetCustomAttributeOne( System.Reflection.TypeOf( System.Reflection.CDeclaringTypeAttribute ) );
            if ( attrDeclaringType != null )
            {
                let model = attrDeclaringType.DeclaringType.GetConstructor().Invoke();
                (<CViewModel>model).GetElementsFromView( this );
                fieldInfo.SetValue( this, model );
            }
        }

        protected BindFieldWithView( fieldInfo: System.Reflection.CFieldInfo, attributeFromView: Attributes.FromViewAttribute, viewList: CView.UDependViewList ): void
        {
            let attrDeclaringType = fieldInfo.GetCustomAttributeOne( System.Reflection.TypeOf( System.Reflection.CDeclaringTypeAttribute ) );
            if ( attrDeclaringType == null )
                return;
            
            let isArray: boolean = false;
            let viewType: System.Reflection.CType = null;

            let bindType = attrDeclaringType.DeclaringType;
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
                for ( const viewListNode of viewList )
                {
                    if ( viewListNode.viewType.IsEquivalentTo( viewType ) )
                    {
                        viewListTemp.push( viewListNode.viewInstance );
                    }
                }
                fieldInfo.SetValue( this, viewListTemp );
            }
            else
            {
                for ( const viewListNode of viewList )
                {
                    if ( viewListNode.viewType.IsEquivalentTo( viewType ) )
                    {
                        fieldInfo.SetValue( this, viewListNode.viewInstance );
                        break;
                    }
                }
            }
        }

        protected BindFieldWithElement( fieldInfo: System.Reflection.CFieldInfo, attrFromElement: Attributes.FromElementAttribute ): void
        {
            let elementWhere: JQuery = null;
            if ( attrFromElement.FromBody == true )
            {
                elementWhere = $( document.body ).find( attrFromElement.SelectorText );
            }
            else
            {
                if ( attrFromElement.SelectorText == null )
                    elementWhere = this.m_elementRoot;
                else
                    elementWhere = this.m_elementRoot.find( attrFromElement.SelectorText );
            }
            fieldInfo.SetValue( this, elementWhere );
        }

        protected ReBindActions(): void
        {
            let controller = this.GetController();
            if ( controller != null )
            {
                this.ReBindActionsForType( controller.GetType(), controller );
            }
            this.ReBindActionsForType( this.GetType(), this );
        }

        protected ReBindActionsForType( type: System.Reflection.CType, caller: any ): void
        {
            let view = this;
            let methodInfos = type.GetMethods();
            for ( const mi of methodInfos )
            {
                let actionAttrList = mi.GetCustomAttributes( System.Reflection.TypeOf( Attributes.SetActionAttribute ) );
                if ( actionAttrList == null || actionAttrList.length == 0 )
                    continue;
                console.debug( actionAttrList );
                for ( const actionAttr of actionAttrList )
                {
                    let event = actionAttr.Event;
                    let selectorText = actionAttr.SelectorText;
                    let elementTemp: JQuery = null;
                    if ( actionAttr.FromBody == true )
                    {
                        if ( selectorText == null )
                            elementTemp = $( "body" );
                        else
                            elementTemp = $( selectorText );
                    }
                    else
                    {
                        if ( selectorText == null )
                            elementTemp = this.m_elementRoot;
                        else
                            elementTemp = this.m_elementRoot.find( selectorText );
                    }
                    if ( elementTemp == null || elementTemp.length == 0 )
                        continue;
                    
                    if ( event == "click" )
                    {
                        elementTemp.click( function( e )
                        {
                            return view.InvokeControllerMethod( caller, $( this ), e, mi );
                        });
                    }
                    else if ( event == "valuechange" )
                    {
                        elementTemp.change( function( e )
                        {
                            return view.InvokeControllerMethod( caller, $( this ), e, mi );
                        });
                    }
                    else
                    {
                        elementTemp.on( event, function( e )
                        {
                            return view.InvokeControllerMethod( caller, $( this ), e, mi );
                        } );
                    }
                }
            }
        }

        protected InvokeControllerMethod( caller: any, elementEvent: JQuery, jqEvent: JQuery.Event, methodInfo: System.Reflection.CMethodInfo ): boolean
        {
            let parameterInfos = methodInfo.GetParameters();
            let parameters = Array( parameterInfos.length );
            for ( let parameterIndex = 0; parameterIndex < parameterInfos.length; parameterIndex ++ )
            {
                let pi = parameterInfos[ parameterIndex ];

                let attrEventElement = pi.GetCustomAttributeOne( System.Reflection.TypeOf( Attributes.EventElementAttribute ) );
                if ( attrEventElement != null )
                {
                    parameters[ parameterIndex ] = elementEvent;
                    continue;
                }

                let attrEventElementEvent = pi.GetCustomAttributeOne( System.Reflection.TypeOf( Attributes.EventElementEventAttribute ) );
                if ( attrEventElementEvent != null )
                {
                    parameters[ parameterIndex ] = jqEvent;
                    continue;
                }

                let attrEventView = pi.GetCustomAttributeOne( System.Reflection.TypeOf( Attributes.EventViewAttribute ) );
                if ( attrEventView != null )
                {
                    parameters[ parameterIndex ] = this;
                    continue;
                }

                let attrInjectionProvider = pi.GetCustomAttributeOne( System.Reflection.TypeOf( Autofac.CInjectionProviderAttribute ) );
                if ( attrInjectionProvider != null )
                {
                    parameters[ parameterIndex ] = GetIoc();
                    continue;
                }

                let attrDeclaringType = pi.GetCustomAttributeOne( System.Reflection.TypeOf( System.Reflection.CDeclaringTypeAttribute ) );
                if ( attrDeclaringType != null )
                {
                    let attrIocWithName = pi.GetCustomAttributeOne( System.Reflection.TypeOf( Autofac.CWithNameAttribute ) );
                    if ( attrIocWithName != null )
                    {
                        parameters[ parameterIndex ] = GetIoc().ResolveNamed( attrDeclaringType.DeclaringType, attrIocWithName.Name );
                    }
                    else
                    {
                        let attrIocWithKey = pi.GetCustomAttributeOne( System.Reflection.TypeOf( Autofac.CWithKeyAttribute ) );
                        if ( attrIocWithKey != null )
                        {
                            parameters[ parameterIndex ] = GetIoc().ResolveKeyed( attrDeclaringType.DeclaringType, attrIocWithKey.Key );
                        }
                        else
                        {
                            parameters[ parameterIndex ] = GetIoc().Resolve( attrDeclaringType.DeclaringType );
                        }
                    }
                    continue;
                }
            }

            return methodInfo.Invoke( caller, ...parameters );
        }

        public Show(): void
        {
            this.m_elementRoot.show();
        }

        public Hide(): void
        {
            this.m_elementRoot.hide();
        }

        public IsShow(): boolean
        {
            return this.m_elementRoot.is( ":hidden" ) == false;
        }

        public GetElementRoot(): JQuery
        {
            return this.m_elementRoot;
        }
    };

    export namespace CView
    {
        export enum UCreateMethod
        {
            Append,
            Before,
            After,
        };

        export type UDependViewList = Array<
        {
            viewType: System.Reflection.CType< CView >;
            viewInstance: CView;
        } >;
    }

    export abstract class CViewController
    {

    };


    // export interface IViewProvider
    // {
    //     ResolveView< TView extends CView >( viewType: System.Reflection.CType< TView > ): TView;
    // }

    // var uViewProvider: IViewProvider = null;
    // var uIocProvider: Autofac.IProvider = null;

    // export function InitializeViewProvider( provider: IViewProvider ): void
    // {
    //     uViewProvider = provider;
    //     //console.debug( Reflect.defineProperty( Mvc, "uViewProvider", { writable: false } ) );
    // }

    // export function GetViewProvider(): IViewProvider
    // {
    //     return uViewProvider;
    // }

    var uIocProvider: Autofac.ILifetimeScope = null;

    export function InitializeIoc( iocProvider: Autofac.ILifetimeScope ): void
    {
        uIocProvider = iocProvider;
    }

    export function GetIoc(): Autofac.ILifetimeScope
    {
        return uIocProvider;
    }
}
