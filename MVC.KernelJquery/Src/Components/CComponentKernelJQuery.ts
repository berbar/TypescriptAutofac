

namespace iberbar.MVC.KernelJquery.Components
{
    var uAllocateID: number = 0;
    export function AllocateID(): string
    {
        uAllocateID++;
        return "iberbar_MVC2_" + uAllocateID;
    }

    export class CComponentKernelJQuery extends MVC.Core.CComponentKernel< IViewCreator >
    {
        private m_uniqueId: string = null;

        private m_elementRoot: JQuery = null;

        private m_componentFadeIn: CComponentFadeIn = null;
        private m_componentFadeOut: CComponentFadeOut = null;

        Create( view: CView, element: JQuery, method: UViewCreateStyle ): void
        {
            this.m_uniqueId = AllocateID();

            let strHTML: string;
            let classes: Array< string >
            try
            {
                strHTML = view.ReturnHTML();
                classes = view.ReturnClasses();
            }
            catch ( error )
            {
                console.error( "Failed to create html with JQueryKernel" );
                console.error( error.stack );
                return;
            }

            let strClasses = "";
            if ( classes != null && classes.length > 0 )
            {
                for ( let i = 0; i < classes.length; i ++ )
                {
                    let cls = classes[ i ];
                    strClasses += cls + " ";
                }
                strClasses = `class="${strClasses}"`;
            }
            strHTML = `<div id="${this.m_uniqueId}" ${strClasses}>${strHTML}</div>`;
            if ( method == UViewCreateStyle.Append )
            {
                this.m_elementRoot = element.append( strHTML ).find( "#" + this.m_uniqueId );
            }
            else if ( method == UViewCreateStyle.Before )
            {
                this.m_elementRoot = element.before( strHTML ).parent().find( "#" + this.m_uniqueId );
            }
            else
            {
                this.m_elementRoot = element.after( strHTML ).parent().find( "#" + this.m_uniqueId );
            }

            this.m_componentFadeIn = view.GetComponent( TypeOf( CComponentFadeIn ) );
            this.m_componentFadeOut = view.GetComponent( TypeOf( CComponentFadeOut ) );
        }

        public ReCreate( view: CView ): void
        {
            let strHTML: string;
            try
            {
                strHTML = view.ReturnHTML();
            }
            catch ( error )
            {
                console.error( "Failed to create html with JQueryKernel" );
                console.error( error.stack );
                return;
            }
            this.m_elementRoot.empty().append( strHTML );
        }

        public get ElementRoot(): JQuery
        {
            return this.m_elementRoot;
        }

        public FadeIn( duration: number, onshow: System.TCallback< () => void > ): void
        {
            this.m_elementRoot.fadeIn( duration, function()
            {
                onshow.Execute();
            } );
        }

        public FadeOut( duration: number, onhide: System.TCallback< () => void > ): void
        {
            this.m_elementRoot.fadeOut( duration, function()
            {
                onhide.Execute();
            });
        }

        public Show( onshow: System.TCallback< () => void > ): void
        {
            this.m_elementRoot.show();
            onshow.Execute();
        }

        public Hide( onhide: System.TCallback< () => void > ): void
        {
            this.m_elementRoot.hide();
            onhide.Execute();
        }

        public IsShow(): boolean
        {
            return this.m_elementRoot.is( ":hidden" ) == false;
        }

        public Dispose(): void
        {
            this.m_elementRoot.remove();
            this.m_elementRoot = null;
        }
    }
}