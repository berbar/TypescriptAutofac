

namespace iberbar.MVC.KernelJquery
{
    export type UFloatOptions =
    {
        absolutePosition: boolean;
        fixClass?: string;
        autoHide?: boolean;
        autoHideTimeout?: number;
        isPopMenu?: boolean;
    };

    export function Float( options: UFloatOptions ): System.UDecoratorFunctionType_ForClass
    {
        let attribute = new Attributes.CFloatAttribute( options.absolutePosition );
        
        if ( options.fixClass != null )
            attribute.FixClass = options.fixClass;

        if ( options.autoHide != null )
            attribute.AutoHide = options.autoHide;

        if ( options.autoHideTimeout != null )
            attribute.AutoHideTimeout = options.autoHideTimeout;

        if ( options.isPopMenu != null )
            attribute.IsPopMenu = options.isPopMenu;

        return System.AttributeDecorate( attribute );
    }
}
