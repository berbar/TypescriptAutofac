

namespace iberbar.MVC.KernelJquery.Components
{
    @iberbar.System.Reflection.TypeNickname( "iberbar::MVC::KernelJquery::Components::CComponentFadeIn" )
    export class CComponentFadeIn
    {
        private m_duration: JQuery.Duration = null;

        public get Duration(): JQuery.Duration
        {
            return this.m_duration;
        }

        public set Duration( value: JQuery.Duration )
        {
            this.m_duration = value;
        }
    }
}
