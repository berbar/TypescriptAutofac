

// namespace iberbar.MVC.Registration
// {
//     export class CRegistrator
//     {
//         private m_builder: Autofac.CContainerBuilder = null;

//         public constructor( builder: Autofac.CContainerBuilder )
//         {
//             this.m_builder = builder;
//         }

//         public RegisterCommonComponents(): void
//         {
//             let types = [
//                 TypeOf( ViewComponents.CInitComponent_ViewsDependsOn ),
//                 TypeOf( ViewComponents.CInitComponent_BindPropertiesWithElementsAndViews ),
//                 TypeOf( ViewComponents.CInitComponent_BindActions ),
//                 TypeOf( ViewComponents.CInitComponent_BindOverScroll ),
//                 TypeOf( ViewComponents.CInitComponent_ViewController )
//             ];
//             this.m_builder.RegisterTypes( types ).AsSelf().InstancePerDependency().PropertiesAutowired();
//         }

//         public RegisterCustomComponent( componentType: System.Reflection.CType ): void
//         {
//             this.m_builder.RegisterType( componentType ).AsSelf().InstancePerDependency().PropertiesAutowired();
//         }

//         // public RegisterViews( ...assemblies: System.Reflection.CAssembly[] ): void
//         // {
//         //     const vt = TypeOf( CView );
//         //     let viewTypes_SingleInstance: Array< System.Reflection.CType > = Array();
//         //     let viewTypes_Transient: Array< System.Reflection.CType > = Array();
//         //     let viewTypes: Array< System.Reflection.CType >;
//         //     assemblies.forEach( assembly =>
//         //     {
//         //         let types = assembly.GetTypes();
//         //         types.forEach( t =>
//         //         {
//         //             if ( t.IsInheritFrom( vt ) == false )
//         //                 return;
//         //             if ( t.GetCustomAttributeOne( TypeOf( CSingleInstanceViewAttribute ), true ) == null )
//         //                 viewTypes_Transient.push( t );
//         //             else
//         //                 viewTypes_SingleInstance.push( t );
//         //         })
//         //     } );
//         //     this.m_builder.RegisterTypes( viewTypes_SingleInstance ).AsSelf().SingleInstance();
//         //     this.m_builder.RegisterTypes( viewTypes_Transient ).AsSelf().InstancePerDependency();
//         //     for ( const t of viewTypes )
//         //     {
//         //         this.RegisterViewsWhereDependOn( <System.Reflection.CType<CView>>t );
//         //     }
//         // }

//         // public RegisterViewsWhereDependOn( viewType: System.Reflection.CType< CView > ): void
//         // {
//         //     let attrDependOnList = viewType.GetCustomAttributes( TypeOf( Attributes.DependOnViewAttribute ), false );
//         //     if ( attrDependOnList == null || attrDependOnList.length == 0 )
//         //         return;
    
//         //     for ( const attr of attrDependOnList )
//         //     {
//         //         if ( attr.ViewType.GetCustomAttributeOne( TypeOf( CSingleInstanceViewAttribute ), true ) == null )
//         //             this.m_builder.RegisterType( attr.ViewType ).InstancePerDependency();
//         //         else
//         //             this.m_builder.RegisterType( attr.ViewType ).SingleInstance();
//         //         this.RegisterViewsWhereDependOn( attr.ViewType );
//         //     }
//         // }
//     }
// }