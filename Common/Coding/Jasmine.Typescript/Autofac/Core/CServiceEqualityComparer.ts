
namespace iberbar.Autofac.Core
{
    export class CServiceEqualityComparer implements System.Collections.Generic.IEqualityComparer< CService >
    {
        Equals(a: CService, b: CService): boolean
        {
            return a.Equals( b );
        }
    }
}