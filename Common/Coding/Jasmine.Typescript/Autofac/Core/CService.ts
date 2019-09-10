

namespace Ioc.Core
{
    export abstract class CService implements System.IEquatable< CService >
    {
        public abstract Equals(other: CService): boolean;
    }
}