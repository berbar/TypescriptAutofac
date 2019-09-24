

namespace iberbar.Autofac.Activators.ProvidedInstance
{
    export class CProvidedInstanceActivator extends CInstanceActivator
    {
        private m_actived: boolean = false;
        private readonly m_instance: object = null;

        public constructor( instance: object )
        {
            super( instance.GetType() );
            this.m_instance = instance;
        }

        public ActivateInstance( context: IComponentContext, parameters?: Core.CParameter[] ): object
        {
            if ( this.m_actived == true )
                throw new Error();

            this.m_actived = true;

            return this.m_instance;
        }
    }
}