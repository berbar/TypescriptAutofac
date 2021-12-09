

namespace iberbar.MVC.KernelJquery
{
    export interface IViewCreator
    {
        ( element: JQuery, method: UViewCreateStyle ): void;
    }
}