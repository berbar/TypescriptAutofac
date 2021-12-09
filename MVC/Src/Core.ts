

// namespace iberbar.MVC
// {
//     var uAllocateID: number = 0;
//     export function AllocateID(): string
//     {
//         uAllocateID++;
//         return "iberbar_Mvc1_" + uAllocateID;
//     }

//     export class CDataModel
//     {

//     }

//     export class CViewModel
//     {
//         /**
//          * 从视图中获取JQuery元素
//          * @param view 
//          */
//         public GetElementsFromView( view: CView ): void
//         {
//             let elementRoot = view.GetElementRoot()
//             let modelType = this.GetType();
//             let fieldInfos = modelType.GetFields();
//             for ( const fi of fieldInfos )
//             {
//                 let attrFromElement = fi.GetCustomAttributeOne( System.Reflection.TypeOf( Attributes.FromElementAttribute ) );
//                 if ( attrFromElement == null )
//                     continue;
//                 let elementWhere: JQuery = null;
//                 if ( attrFromElement.FromBody == true )
//                 {
//                     elementWhere = $( document.body ).find( attrFromElement.SelectorText );
//                 }
//                 else
//                 {
//                     if ( attrFromElement.SelectorText == null )
//                         elementWhere = elementRoot;
//                     else
//                         elementWhere = elementRoot.find( attrFromElement.SelectorText );
//                 }
//                 fi.SetValue( this, elementWhere );
//             }
//         }

//         /**
//          * 将data数据反射到当前的ViewModel中
//          * @param data 数据
//          */
//         public FromObject( data: any ): void
//         {
//             let modelType = this.GetType();
//             let fieldInfos = modelType.GetFields();
//             for ( const fi of fieldInfos )
//             {
//                 let attrFromElement = fi.GetCustomAttributeOne( System.Reflection.TypeOf( Attributes.FromElementAttribute ) );
//                 if ( attrFromElement == null )
//                     continue;
//                 let element: JQuery = fi.GetValue( this );
//                 if ( element == null || element.length == 0 )
//                     continue;
//                 let dataValue = data[ fi.Name ];
//                 let dataType = typeof( dataValue );
//                 if ( dataValue == null )
//                     continue;
//                 if ( dataType == "boolean" )
//                 {
//                     element.prop( "checked", dataValue );
//                 }
//                 else if ( dataType == "string" || dataType == "number" )
//                 {
//                     element.val( dataValue );
//                 }
//             }
//             let propertyInfos = modelType.GetProperties();
//             for ( const pi of propertyInfos )
//             {
//                 let dataValue = data[ pi.Name ];
//                 let dataType = typeof( dataValue );
//                 if ( dataValue == null )
//                     continue;
//                 pi.SetValue( this, dataValue );
//             }
//         }

//         /**
//          * 将当前的ViewModel模型反射到数据
//          * @param type 数据类型
//          */
//         public ToObject< T extends object >( type: System.Reflection.CType< T > ): T
//         {
//             let obj = type.GetConstructor().Invoke();
//             let modelType = this.GetType();
//             let fieldInfos = modelType.GetFields();
//             for ( const fi of fieldInfos )
//             {
//                 let attrFromElement = fi.GetCustomAttributeOne( System.Reflection.TypeOf( Attributes.FromElementAttribute ) );
//                 if ( attrFromElement == null )
//                     continue;
//                 let fi_obj = type.GetFieldOne( fi.Name );
//                 if ( fi_obj == null )
//                     continue;
//                 let attrDeclaringType = fi_obj.GetCustomAttributeOne( System.Reflection.TypeOf( System.Reflection.CDeclaringTypeAttribute ) );
//                 if ( attrDeclaringType == null )
//                     continue;
//                 let element = <JQuery>fi.GetValue( this );
//                 let dataValueType = attrDeclaringType.DeclaringType;
//                 let dataValue: any = null;
//                 if ( dataValueType.IsEquivalentTo( System.Reflection.TypeOf( Number ) ) )
//                 {
//                     dataValue = Number( element.val() );
//                     if ( Number.isNaN( dataValue ) )
//                         dataValue = null;
//                 }
//                 else if ( dataValueType.IsEquivalentTo( System.Reflection.TypeOf( String ) ) )
//                 {
//                     dataValue = element.val().toString();
//                 }
//                 else if ( dataValueType.IsEquivalentTo( System.Reflection.TypeOf( Boolean ) ) )
//                 {
//                     dataValue = element.prop( "checked" );
//                 }
//                 fi_obj.SetValue( obj, dataValue );
//             }
//             return <T>obj;
//         }
//     }



//     export abstract class CViewController
//     {

//     };


//     // export interface IViewProvider
//     // {
//     //     ResolveView< TView extends CView >( viewType: System.Reflection.CType< TView > ): TView;
//     // }

//     // var uViewProvider: IViewProvider = null;
//     // var uIocProvider: Autofac.IProvider = null;

//     // export function InitializeViewProvider( provider: IViewProvider ): void
//     // {
//     //     uViewProvider = provider;
//     //     //console.debug( Reflect.defineProperty( Mvc, "uViewProvider", { writable: false } ) );
//     // }

//     // export function GetViewProvider(): IViewProvider
//     // {
//     //     return uViewProvider;
//     // }

//     var uIocProvider: Autofac.ILifetimeScope = null;

//     export function InitializeIoc( iocProvider: Autofac.ILifetimeScope ): void
//     {
//         uIocProvider = iocProvider;
//     }

//     export function GetIoc(): Autofac.ILifetimeScope
//     {
//         return uIocProvider;
//     }
// }
