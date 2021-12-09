

namespace iberbar.MVC
{
    export interface CView
    {
        Create( ...args: Parameters< KernelJquery.IViewCreator > ): ReturnType< KernelJquery.IViewCreator >;
        GetElementRoot(): JQuery;
        ReturnHTML(): string;
        ReturnClasses(): Array< string >;
        GetComponentKernelJquery(): KernelJquery.Components.CComponentKernelJQuery;

        // SetFadeIn( duration: JQuery.Duration ): void
        // SetFadeOut( duration: JQuery.Duration ): void;
    }

    CView.prototype.GetElementRoot = function()
    {
        let componentJQuery = System.dynamic_cast( this.GetComponentKernel<KernelJquery.IViewCreator>(), KernelJquery.Components.CComponentKernelJQuery );
        if ( componentJQuery == null )
            throw new Error( "No Jquery" );
        return componentJQuery.ElementRoot;
    }

    CView.prototype.GetComponentKernelJquery = function()
    {
        return <KernelJquery.Components.CComponentKernelJQuery>(this.GetComponentKernel<KernelJquery.IViewCreator>());
    }

    // CView.prototype.SetFadeIn = function( duration: JQuery.Duration )
    // {
    //     let componentType = TypeOf( KernelJquery.Components.CComponentFadeIn );
    //     let component = this.GetComponent( componentType );
    //     if ( component == null )
    //     {
    //         console.warn( `There is no component<${componentType.GetNickname()}>` );
    //     }
    //     else
    //     {
    //         component.Duration = duration;
    //     }
    // }

    // CView.prototype.SetFadeOut = function( duration: JQuery.Duration )
    // {
    //     let componentType = TypeOf( KernelJquery.Components.CComponentFadeOut );
    //     let component = this.GetComponent( componentType );
    //     if ( component == null )
    //     {
    //         console.warn( `There is no component<${componentType.GetNickname()}>` );
    //     }
    //     else
    //     {
    //         component.Duration = duration;
    //     }
    // }

    Reflect.defineProperty( CView.prototype, "GetElementRoot", { enumerable: false } );
    // Reflect.defineProperty( CView.prototype, "SetFadeIn", { enumerable: false } );
    // Reflect.defineProperty( CView.prototype, "SetFadeOut", { enumerable: false } );
}