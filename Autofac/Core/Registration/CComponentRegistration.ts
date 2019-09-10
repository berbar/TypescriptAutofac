


namespace Autofac.Core.Registration
{
    export class CComponentRegistration implements IComponentRegistration
    {
        private m_id: string;
        private m_activator: IInstanceActivator;
        private m_lifetime: IComponentLifetime;
        private m_sharing: UInstanceSharing;
        private m_ownership: any;
        private m_services: ReadonlyArray< CService >;
        private m_metadata: { [ key: string ]: object };
        private m_target: IComponentRegistration;

        private readonly m_activatingHandlers: System.TCallbackArray< ( sender: any, e: Core.IActivatingEventArgs<object> ) => void > = new System.TCallbackArray();

        public constructor(
            id: string,
            activator: IInstanceActivator,
            lifetime: IComponentLifetime,
            sharing: UInstanceSharing,
            ownership: any,
            services: ReadonlyArray< CService >,
            metadata: { [ key: string ]: object },
            target?: IComponentRegistration )
        {
            this.m_id = id;
            this.m_activator = activator;
            this.m_lifetime = lifetime;
            this.m_sharing = sharing;
            this.m_ownership = ownership;
            this.m_services = services;
            this.m_metadata = metadata;
            this.m_target = target;
        }

        public get ID(): string
        {
            return this.m_id;
        }

        public get Activator(): IInstanceActivator
        {
            return this.m_activator;
        }

        public get Lifetime(): IComponentLifetime
        {
            return this.m_lifetime;
        }

        public get Sharing(): UInstanceSharing
        {
            return this.m_sharing;
        }

        public get Services(): ReadonlyArray< CService >
        {
            return this.m_services;
        }

        public get Metadta()
        {
            return this.m_metadata;
        }

        public get Target(): IComponentRegistration
        {
            return this.m_target;
        }

        public get Preparing() {
            throw new Error("Method not implemented.");
        }

        RaisePreparing(context: IComponentContext, parameters: System.RefParameter< Array< any > >): void
        {
            throw new Error("Method not implemented.");
        }

        public get Activating(): System.TCallbackArray< ( sender: any, e: Core.IActivatingEventArgs<object> ) => void >
        {
            return this.m_activatingHandlers;
        }

        public RaiseActivating(context: IComponentContext, parameters: ReadonlyArray< CParameter >, instance: object ): object
        {
            let args = new CActivatingEventArgs( context, this, parameters, instance );
            this.Activating.Execute( this, args );
            return args.Instance;
        }

        public get Activated()
        {
            throw new Error("Method not implemented.");
        }

        RaiseActivated(context: IComponentContext, parameters: ReadonlyArray< CParameter >, instance: object): void
        {
            throw new Error("Method not implemented.");
        }

        Dispose(): void
        {
            throw new Error("Method not implemented.");
        }
    }
}