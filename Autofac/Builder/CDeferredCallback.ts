

namespace iberbar.Autofac.Builder
{
    export class CDeferredCallback
    {
        private readonly m_callback: System.Action< Core.IComponentRegistry > = null;

        public constructor( callback: System.Action< Core.IComponentRegistry > )
        {
            this.m_callback = callback;
        }

        public get Callback()
        {
            return this.m_callback;
        }
    }
}