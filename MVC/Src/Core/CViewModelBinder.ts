

namespace iberbar.MVC.Core
{
    export abstract class CViewModelBinder
    {
        /**
         * 绑定视图模型
         * @param view 操作绑定组件的视图实例
         * @param model 绑定对象
         */
        public abstract BindModel( view: CView, model: object ): void;
    }
}
