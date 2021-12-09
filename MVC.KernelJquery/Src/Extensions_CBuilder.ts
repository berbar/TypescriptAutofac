
namespace iberbar.MVC
{
    export interface CBuilder
    {
        SetComponentKernelJquery(): void;

        /**
         * 注册JQuery模型绑定组件
         * @param modelComponentType (可选)组件类型，默认 iberbar.MVC.Core.CComponentBindModels
         */
        AddComponentBindModelsJquery(
            modelComponentType?: System.Reflection.CType< object >
        ): void;

        /**
         * 注册JQuery事件绑定组件
         * @param actionComponentType 
         * @param controllerComponentType 
         */
        AddComponentBindActionsJquery(
            actionComponentType?: System.Reflection.CType< object >,
            controllerComponentType?: System.Reflection.CType< object >
        ): void;

        /**
         * 注册JQuery视图依赖组件，必须放在AddComponentBindModelsJQuery和AddComponentBindActionsJQuery前面
         */
        AddComponentDependOnView(): void;
    }

    CBuilder.prototype.SetComponentKernelJquery = function()
    {
        this.SetComponentKernel( System.Reflection.TypeOf( KernelJquery.Components.CComponentKernelJQuery ) );
    }

    CBuilder.prototype.AddComponentBindModelsJquery = function(
        modelComponentType?: System.Reflection.CType< object >
    ): void
    {
        this.AddComponentBindModels( System.Reflection.TypeOf( KernelJquery.Components.CViewModelBinder ), modelComponentType );
    }

    CBuilder.prototype.AddComponentBindActionsJquery = function(
        actionComponentType?: System.Reflection.CType< object >,
        controllerComponentType?: System.Reflection.CType< object >
    )
    {
        this.AddComponentBindActions(
            System.Reflection.TypeOf( KernelJquery.Components.CActionBinder ),
            actionComponentType,
            controllerComponentType
        );
    }

    CBuilder.prototype.AddComponentDependOnView = function()
    {
        this.AddComponent( System.Reflection.TypeOf( KernelJquery.Components.CComponentDependOnViews ) );
    }

    Reflect.defineProperty( CBuilder.prototype, "SetComponentKernelJQuery", { enumerable: false } );
}
