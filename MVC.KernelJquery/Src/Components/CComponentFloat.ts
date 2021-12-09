

namespace iberbar.MVC.KernelJquery.Components
{
    @System.Reflection.TypeNickname( "iberbar::MVC::KernelJquery::Components::CComponentFloat" )
    export class CComponentFloat implements Core.IComponentInit
    {
        private m_floatAttribute: Readonly< Attributes.CFloatAttribute > = null;
        private m_timer: number = null;
        private m_elementRoot: JQuery = null;
        
        public InitView( view: CView ): void
        {
            let viewType = view.GetType();
            let floatAttributeType = TypeOf( Attributes.CFloatAttribute );
            this.m_floatAttribute = viewType.GetCustomAttributeOne( floatAttributeType, true );
            if ( this.m_floatAttribute == null )
                throw new Error( `Can't find the attribute of ${floatAttributeType.GetNickname()}` );

            this.m_elementRoot = view.GetElementRoot();

            if ( this.m_floatAttribute.AbsolutePosition == true )
            {
                this.m_elementRoot.css( "position", "absolute" );
            }
            else
            {
                this.m_elementRoot.css( "position", "fixed" );
            }

            if ( this.m_floatAttribute.AutoHide == true )
            {
                let component = this;
                this.m_elementRoot.hover( function()
                {
                    //$(this).addClass( component.m_floatAttribute.FixClass );
                    component.ClearTimer();

                }, function()
                {
                    //$(this).removeClass( component.m_floatAttribute.FixClass );
                    component.HideNow( false );
                });
            }

            if ( this.m_floatAttribute.IsPopMenu == true )
            {
                let component = this;
                document.addEventListener( "click", function()
                {
                    component.m_elementRoot.hide();
                });
            }
        }
        
        public ReInitView( view: CView ): void
        {
        }

        private HideNow( now: boolean ): void
        {
            if ( now == true )
            {
                this.ClearTimer();
                this.m_elementRoot.hide();
            }
            else
            {
                if ( this.m_timer == null )
                {
                    this.m_timer = setTimeout( function( component: CComponentFloat )
                    {
                        component.m_elementRoot.hide();
                        component.ClearTimer();
                    }, this.m_floatAttribute.AutoHideTimeout, this );
                }
            }
        }

        private ClearTimer(): void
        {
            clearTimeout( this.m_timer );
            this.m_timer = null;
        }
    }
}
