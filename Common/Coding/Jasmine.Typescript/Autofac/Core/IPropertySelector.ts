

namespace iberbar.Autofac.Core
{
    export interface IPropertySelector
    {
        InjectProperty( propertyInfo: System.Reflection.CPropertyInfo, instance: object ): boolean;
    }
}