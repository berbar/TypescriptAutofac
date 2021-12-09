
namespace iberbar.MVC.KernelJquery.Attributes
{
    @System.AttributeUsage( System.UAttributeTarget.Class, false, true )
    @System.Reflection.TypeNickname( "iberbar::MVC::KernelJquery::Attributes::CFloatAttribute" )
    export class CFloatAttribute extends System.CAttribute
    {
        private m_absolutePosition: boolean = false;
        private m_fixClass: string = null;
        private m_autoHide: boolean = false;
        private m_autoHideTimeout: number = null;
        private m_isPopMenu: boolean = false;

        public constructor( absolutePosition: boolean )
        {
            super();
            this.m_absolutePosition = absolutePosition;
        }

        public get AbsolutePosition(): boolean
        {
            return this.m_absolutePosition;
        }

        public get FixClass(): string
        {
            return this.m_fixClass;
        }

        public set FixClass( value: string )
        {
            this.m_fixClass = value;
        }

        public get AutoHide(): boolean
        {
            return this.m_autoHide;
        }

        public set AutoHide( value: boolean )
        {
            this.m_autoHide = value;
        }

        public get AutoHideTimeout(): number
        {
            return this.m_autoHideTimeout;
        }

        public set AutoHideTimeout( value: number )
        {
            this.m_autoHideTimeout = value;
        }

        public get IsPopMenu(): boolean
        {
            return this.m_isPopMenu;
        }

        public set IsPopMenu( value: boolean )
        {
            this.m_isPopMenu = value;
        }
    }
}
