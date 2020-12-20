
namespace iberbar.Autofac.Builder
{
    export class CRegistrationData
    {
        private m_defaultService: Core.CService = null;
        private m_defaultServiceOverriden: boolean = false;
        private m_services: Array< Core.CService > = Array();

        private m_sharing: Core.UInstanceSharing = Core.UInstanceSharing.None;
        private m_lifetime: Core.IComponentLifetime = new Core.Lifetime.CCurrentScopeLifetime();

        private m_deferredCallback: CDeferredCallback = null;

        private m_activatingHandlers: System.TCallbackArray< ( sender: any, e: Core.CActivatingEventArgs<object> ) => void > = new System.TCallbackArray();

        public constructor( defaultService: Core.CService )
        {
            this.m_defaultService = defaultService;
        }

        public AddService( service: Core.CService ): void
        {
            this.m_defaultServiceOverriden = true;
            this.m_services.push( service );
        }

        public AddServices( services: Core.CService[] ): void
        {
            this.m_defaultServiceOverriden = true;
            this.m_services = this.m_services.concat( services );
        }

        public GetServices(): Array< Core.CService >
        {
            if ( this.m_defaultServiceOverriden == true )
                return this.m_services;
            return ( this.m_services.length == 0 ) ? [ this.m_defaultService ]: this.m_services;
        }

        public set Lifetime( value: Core.IComponentLifetime )
        {
            this.m_lifetime = value;
        }

        public get Lifetime(): Core.IComponentLifetime
        {
            return this.m_lifetime;
        }

        public set Sharing( value: Core.UInstanceSharing )
        {
            this.m_sharing = value;
        }

        public get Sharing(): Core.UInstanceSharing
        {
            return this.m_sharing;
        }

        public set DeferredCallback( value: CDeferredCallback )
        {
            this.m_deferredCallback = value;
        }

        public get DeferredCallback(): CDeferredCallback
        {
            return this.m_deferredCallback;
        }

        public get ActivatingHandlers(): System.TCallbackArray< ( sender: any, e: Core.CActivatingEventArgs<object> ) => void >
        {
            return this.m_activatingHandlers;
        }

        public CopyFrom( that: CRegistrationData, includeDefaultService: boolean ): void
        {
            if ( includeDefaultService == true )
                this.m_defaultService = that.m_defaultService;
            this.m_defaultServiceOverriden = that.m_defaultServiceOverriden;
            this.m_lifetime = that.m_lifetime;
            this.m_sharing = that.m_sharing;
            this.m_services = this.CopyArray( that.m_services );
            this.m_activatingHandlers = that.m_activatingHandlers.Copy();
        }

        private CopyArray<T>( src: T[] ): T[]
        {
            let dest = [];
            for ( let i = 0; i < src.length; i ++ )
            {
                let temp = src[ i ];
                dest.push( temp );
            }
            return dest;
        }
    };
}
