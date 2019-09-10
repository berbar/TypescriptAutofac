

namespace Autofac.Core.Registration
{
    export class CServiceRegistrationInfo
    {
        private readonly m_service: CService = null;

        private readonly m_defaultImplementations: IComponentRegistration[] = [];

        private m_preserveDefaultImplementations: IComponentRegistration[] = null;

        private m_sourceImplementations: IComponentRegistration[] = null;

        public constructor( service: CService )
        {
            this.m_service = service;
        }

        public AddImplementation( registration: IComponentRegistration, preserveDefaults: boolean, originatedFromSource: boolean ): void
        {
            if ( preserveDefaults == true )
            {
                if ( originatedFromSource == true )
                {
                    if ( this.m_sourceImplementations == null )
                    {
                        this.m_sourceImplementations = [];
                    }

                    this.m_sourceImplementations.push( registration );
                }
                else
                {
                    if ( this.m_preserveDefaultImplementations == null )
                    {
                        this.m_preserveDefaultImplementations = [];
                    }

                    this.m_preserveDefaultImplementations.push( registration );
                }
            }
            else
            {
                if ( originatedFromSource == true )
                    throw new Error();

                this.m_defaultImplementations.push( registration );
            }
        }

        public GetRegistration(): IComponentRegistration
        {
            let componentRegistration: IComponentRegistration = null;

            if ( this.m_defaultImplementations != null )
            {
                if ( this.m_defaultImplementations.length > 0 )
                    componentRegistration = this.m_defaultImplementations[ this.m_defaultImplementations.length - 1 ];
            }

            if ( componentRegistration == null )
            {
                if ( this.m_sourceImplementations != null && this.m_sourceImplementations.length > 0 )
                    componentRegistration = this.m_sourceImplementations[ 0 ];
            }

            if ( componentRegistration == null )
            {
                if ( this.m_preserveDefaultImplementations != null && this.m_preserveDefaultImplementations.length > 0 )
                    componentRegistration = this.m_preserveDefaultImplementations[ 0 ];
            }

            return componentRegistration;
        }
    }
}