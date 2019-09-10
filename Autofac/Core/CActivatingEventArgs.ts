

namespace Ioc.Core
{
    export class CActivatingEventArgs< T > implements IActivatingEventArgs< T >
    {
        private readonly m_instance: T = null;

        private readonly m_context: IComponentContext = null;

        private readonly m_registration: IComponentRegistration = null;

        private readonly m_parameters: ReadonlyArray< CParameter > = null;

        public constructor(
            context: IComponentContext,
            registration: IComponentRegistration,
            parameters: ReadonlyArray< CParameter >,
            instance: T )
        {
            this.m_context = context;
            this.m_registration = registration;
            this.m_parameters = parameters;
            this.m_instance = instance;
        }

        public ReplaceInstance( instance: object ): void
        {
            throw new Error("Method not implemented.");
        }

        public get Context(): IComponentContext
        {
            return this.m_context;
        }

        public get Registration(): IComponentRegistration
        {
            return this.m_registration;
        }

        public get Parameters(): ReadonlyArray< CParameter >
        {
            return this.m_parameters;
        }

        public get Instance(): T
        {
            return this.m_instance;
        }
    }
}