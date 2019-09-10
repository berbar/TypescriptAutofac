
/// <reference path="./CService.ts" />


namespace Ioc.Core
{
    export class CKeyedService extends CService implements IServiceWithType
    {
        private readonly m_serviceType: System.Reflection.CType = null;

        private readonly m_key: any = null;

        public constructor( serviceKey: any, serviceType: System.Reflection.CType )
        {
            super();
            this.m_key = serviceKey;
            this.m_serviceType = serviceType;
        }

        GetServiceType(): System.Reflection.CType
        {
            return this.m_serviceType;
        }

        ChangeType(newType: System.Reflection.CType<object>): CService {
            throw new Error("Method not implemented.");
        }

        Equals( other: CKeyedService ): boolean
        {
            if ( other.m_serviceType == undefined )
                return false;
            if ( other.m_key == undefined )
                return false;
            return this.GetType().IsEquivalentTo( other.GetType() ) &&
                this.m_serviceType.IsEquivalentTo( other.m_serviceType ) &&
                this.CompareKeys( this.m_key, other.m_key );
        }

        private CompareKeys( k1: any, k2: any ): boolean
        {
            if ( k1 === k2 )
                return true;
            if ( (<System.IEquatable<any>>k1).Equals != undefined && (<System.IEquatable<any>>k2).Equals != undefined && (<System.IEquatable<any>>k1).Equals( k2 ) )
                return true;
            return false;
        }
    }
}