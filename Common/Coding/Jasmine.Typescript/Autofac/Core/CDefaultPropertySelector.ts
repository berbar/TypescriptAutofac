
namespace Autofac.Core
{
    export class CDefaultPropertySelector implements IPropertySelector
    {
        protected m_preserveSetValues: boolean = false;

        public constructor( preserveSetValues?: boolean )
        {
            this.m_preserveSetValues = ( preserveSetValues == true ) ? true : false;
        }

        /**
         * Provides default filtering to determine if property should be injected by rejecting
         * @param propertyInfo 
         * @param instance 
         */
        public InjectProperty( propertyInfo: System.Reflection.CPropertyInfo, instance: object ): boolean
        {
            if ( propertyInfo.CanWrite == false )
            {
                return false;
            }

            if ( this.m_preserveSetValues == true && propertyInfo.CanRead == false )
            {
                return propertyInfo.GetValue( instance ) == null;
            }

            return true;
        }
    }
}