

namespace Autofac.Core
{
    export class CTypedService extends CService implements IServiceWithType
    {
        private readonly m_serviceType: System.Reflection.CType = null;

        public constructor( serviceType: System.Reflection.CType )
        {
            super();
            this.m_serviceType = serviceType;
        }

        public GetServiceType(): System.Reflection.CType
        {
            return this.m_serviceType;
        }

        public ChangeType( newType: System.Reflection.CType ): CService
        {
            throw new Error("Method not implemented.");
        }

        public Equals( other: CTypedService ): boolean
        {
            if ( other.m_serviceType == undefined )
                return false;
            return this.GetType().IsEquivalentTo( other.GetType() ) && this.m_serviceType.IsEquivalentTo( other.m_serviceType );
        }
    }
}