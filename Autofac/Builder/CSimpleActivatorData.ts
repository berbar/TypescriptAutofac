

namespace Autofac.Builder
{
    export class CSimpleActivatorData implements IActivatorData, IConcreteActivatorData
    {
        private readonly m_activator: Core.IInstanceActivator = null;

        public constructor( activator: Core.IInstanceActivator )
        {
            this.m_activator = activator;
        }

        public GetTypes(): ( t: System.Reflection.CType ) => System.Reflection.CType
        {
            return () => this.m_activator.GetLimitType();
        }

        public GetActivator(): Core.IInstanceActivator {
            return this.m_activator;
        }
    }
}