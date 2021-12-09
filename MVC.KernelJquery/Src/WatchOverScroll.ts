


namespace iberbar.MVC.KernelJquery
{
    /**
     * 例子
     * 
     * ```typescript
     *  class CExample
     *  {
     *      protected OnWatchScroll( element: JQuery, event: UOverScrollEvent ): void
     *      {
     *      }
     *  }
     * ```
     */
    export function WatchOverScroll(): System.UDecoratorFunctionType_ForMethod
    {
        return System.AttributeDecorate( new Attributes.CWatchOverScrollAttribute() );
    }
}

