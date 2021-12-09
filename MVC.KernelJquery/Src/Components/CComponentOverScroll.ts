

namespace iberbar.MVC.KernelJquery.Components
{
    @System.Reflection.AutoReflectMetadata_Constructor
    @System.Reflection.TypeNickname( "iberbar::MVC::KernelJquery::Components::CComponentOverScroll" )
    export class CComponentOverScroll implements Core.IComponentInit
    {
        public InitView( view: CView ): void
        {
            let viewType = view.GetType();
            let componentKernel = view.GetComponentKernelJquery();
            let watch = this.FindWatchMethod( viewType );
            let attributes = viewType.GetCustomAttributes( TypeOf( Attributes.COverScrollAttribute ), true );
            for ( let i = 0; i < attributes.length; i ++ )
            {
                let attr = attributes[ i ];
                let element: JQuery = null;
                let selectorText = attr.SelectorText;
                if ( selectorText == null )
                {
                    element = componentKernel.ElementRoot;
                }
                else
                {
                    element = componentKernel.ElementRoot.find( selectorText );
                }
                if ( element.length > 0 )
                {
                    element.css( "overflow-x", "hidden" );
                    element.css( "overflow-y", "auto" );
                    element.css( "-webkit-overflow-scrolling", "touch" );
                    this.SetOverScroll( view, element.get( 0 ), watch );
                }
            }
        }

        public ReInitView( view: CView ): void
        {
            this.InitView( view );
        }

        private FindWatchMethod( viewType: System.Reflection.CType ): System.Reflection.CMethodInfo
        {
            let methodInfos = viewType.GetMethods();
            for ( let i = 0; i < methodInfos.length; i ++ )
            {
                let method = methodInfos[ i ];
                if ( method.IsDefined( System.Reflection.TypeOf( Attributes.CWatchOverScrollAttribute ) ) )
                    return method;
            }
            return null;
        }

        private SetOverScroll( view: CView, el: HTMLElement, methodInfo: System.Reflection.CMethodInfo ): void
        {
            if ( el == undefined )
                return;
            el.addEventListener('touchstart', function(e)
            {
                e.stopImmediatePropagation();
                var top = this.scrollTop
                ,totalScroll = this.scrollHeight
                ,currentScroll = top + this.offsetHeight;
                if(top === 0) {
                    this.scrollTop = 1;
                }else if(currentScroll === totalScroll) {
                    this.scrollTop = top - 1;
                }
                if ( methodInfo != null )
                    methodInfo.Invoke( view, $( this ), UOverScrollEvent.OnBegin );
            });
        
            el.addEventListener('touchmove', function(e)
            {
                e.stopImmediatePropagation();
                if(this.offsetHeight < this.scrollHeight)
                    (<any>e)._isScroller = true;
            });
        
            el.addEventListener('touchend', function( e )
            {
                e.stopImmediatePropagation();
                if ( methodInfo != null )
                    methodInfo.Invoke( view, $( this ), UOverScrollEvent.OnEnd );
            });

            el.addEventListener( "scroll", function( e )
            {
                e.stopImmediatePropagation();
                if ( methodInfo != null )
                {
                    let element = $(this);
                    methodInfo.Invoke( view, element, UOverScrollEvent.OnScrolling );
                    var scrollTop = element.scrollTop();
                    var scrollHeight = element.get(0).scrollHeight;
                    var windowHeight = element.height();
                    if ( scrollTop == 0 )
                    {
                        methodInfo.Invoke( view, element, UOverScrollEvent.OnScrollToTop );
                    }
                    else if( scrollTop + windowHeight == scrollHeight )
                    {
                        methodInfo.Invoke( view, element, UOverScrollEvent.OnScrollToBottom );
                    }
                }
            });
        }
    };
}

