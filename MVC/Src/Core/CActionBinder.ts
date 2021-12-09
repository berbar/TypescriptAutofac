

namespace iberbar.MVC.Core
{
    export abstract class CActionBinder
    {
        public abstract BindActions( view: CView, handlerType: object ): IActionBinderResult;
    }
}