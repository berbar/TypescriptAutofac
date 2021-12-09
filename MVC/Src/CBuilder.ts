

namespace iberbar.MVC
{
    export class CBuilder
    {
        private m_cb: Autofac.CContainerBuilder = null;
        private m_componentKernelType: System.Reflection.CType<Core.CComponentKernel<any>> = null;
        private m_componentTypes: Array< System.Reflection.CType > = Array();
        private m_componentTypesCommon: Array< System.Reflection.CType > = Array();

        public constructor( cb: Autofac.CContainerBuilder )
        {
            this.m_cb = cb;
        }

        /**
         * 设置内核组件
         * @param componentKernelType 
         */
        public SetComponentKernel( componentKernelType: System.Reflection.CType<Core.CComponentKernel<any>> ): void
        {
            this.m_componentKernelType = componentKernelType;
            this.m_cb.RegisterType( componentKernelType ).AsSelf().InstancePerDependency();
        }
        
        /**
         * 添加通用的组件
         * @param componentType 
         */
        public AddComponent( componentType: System.Reflection.CType, common?: boolean ): void
        {
            if ( this.m_componentTypes.FirstOrDefault( t => t.IsEquivalentTo( componentType ) ) == null &&
                this.m_componentTypesCommon.FirstOrDefault( t => t.IsEquivalentTo( componentType ) ) == null )
            {
                if ( common == false )
                    this.m_componentTypesCommon.push( componentType );
                else
                    this.m_componentTypes.push( componentType );
                this.m_cb.RegisterType( componentType ).AsSelf().InstancePerDependency();
            }
        }

        /**
         * 注册模型绑定组件
         * @param modelBinderType 模型绑定器的类型
         * @param modelComponentType (可选)组件类型，默认 iberbar.MVC.Core.CComponentBindModels
         */
        public AddComponentBindModels(
            modelBinderType: System.Reflection.CType< Core.CViewModelBinder >,
            modelComponentType?: System.Reflection.CType< object >
        ): void
        {
            this.m_cb.RegisterType( modelBinderType ).AsSelf().As( System.Reflection.TypeOf( Core.CViewModelBinder ) ).SingleInstance();
            this.AddComponent( ( modelComponentType == null ) ? System.Reflection.TypeOf( Core.CComponentBindModels ) : modelComponentType );
        }

        /**
         * 注册事件绑定组件
         * @param actionBinderType 
         * @param actionComponentType 
         * @param controllerComponentType 
         */
        public AddComponentBindActions(
            actionBinderType: System.Reflection.CType< Core.CActionBinder >,
            actionComponentType?: System.Reflection.CType< object >,
            controllerComponentType?: System.Reflection.CType< object >
        ): void
        {
            this.m_cb.RegisterType( actionBinderType ).AsSelf().As( System.Reflection.TypeOf( Core.CActionBinder ) ).SingleInstance();
            this.AddComponent( ( actionComponentType == null ) ? System.Reflection.TypeOf( Core.CComponentBindActions ) : actionComponentType );
            this.AddComponent( ( controllerComponentType == null ) ? System.Reflection.TypeOf( Core.CInitComponent_ViewController ) : controllerComponentType );
        }

        /**
         * 注册视图类型，搜索其使用的控制器类型并注册
         * @param viewType 视图类型
         */
        public RegisterView<T extends CView>( viewType: System.Reflection.CType< T > ): Autofac.Builder.IRegistrationBuilder< T >
        {
            let attrsController = viewType.GetCustomAttributes( System.Reflection.TypeOf( Attributes.CAddControllerAttribute ), true );
            if ( attrsController.length > 0 )
            {
                for ( let i =0; i < attrsController.length; i ++ )
                {
                    let attr = attrsController[ i ];
                    this.m_cb.RegisterType( attr.ControllerType ).AsSelf().InstancePerDependency();
                }
            }

            let attrsComponent = viewType.GetCustomAttributes( System.Reflection.TypeOf( Attributes.CAddViewComponentAttribute ), true );
            if ( attrsComponent.length > 0 )
            {
                for ( let i = 0; i < attrsComponent.length; i ++ )
                {
                    let attr = attrsComponent[ i ];
                    this.AddComponent( attr.ComponentType, false );
                }
            }

            let fieldInfos = viewType.GetFields();
            if ( fieldInfos.length > 0 )
            {
                for ( let i = 0; i < fieldInfos.length; i ++ )
                {
                    let field = fieldInfos[ i ];
                    if ( field.IsDefined( System.Reflection.TypeOf( Attributes.CViewModelAttribute ) ) == false )
                    continue;

                    if ( field.FieldType == null )
                        continue;

                    this.m_cb.RegisterType( field.FieldType ).AsSelf().InstancePerDependency();
                }
            }
            return this.m_cb.RegisterType( viewType ).PropertiesAutowired();
        }

        public Build(): void
        {
            let mapper = new Core.CDefaultMapper(
                this.m_componentKernelType,
                this.m_componentTypes
            );
            this.m_cb.RegisterInstance( System.Reflection.TypeOf( Core.CDefaultMapper ), mapper )
                .AsSelf()
                .As( System.Reflection.TypeOf( Core.CMapper ) );
        }
    }
}