

namespace iberbar.MVC.Core
{
    export interface IComponentInit
    {
        InitView( view: CView ): void;
        ReInitView( view: CView ): void;
    }
}
