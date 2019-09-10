
namespace Ioc.Builder
{
    export class CReflectionActivatorData
    {
        private m_implementationType: System.Reflection.CType = null;

        private m_constructor: System.Reflection.CConstructorInfo = null;

        private readonly m_configuredParameters: Core.CParameter[] = [];

        private readonly m_configuredProperties: Core.CParameter[] = [];

        public constructor( implementer: System.Reflection.CType )
        {
            this.m_implementationType = implementer;
            this.m_constructor = this.m_implementationType.GetConstructor();
        }

        public get ImplementationType(): System.Reflection.CType
        {
            return this.m_implementationType;
        }

        public get ConfiguredParameters(): Core.CParameter[]
        {
            return this.m_configuredParameters;
        }

        public get ConfiguredProperties(): Core.CParameter[]
        {
            return this.m_configuredProperties;
        }
    }
}