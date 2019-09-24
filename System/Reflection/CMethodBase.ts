
/// <reference path="./MemberInfo.ts" />


namespace iberbar.System.Reflection
{
    export abstract class CMethodBase extends CMemberInfo
    {
        public abstract GetParameters(): Array< CParameterInfo >;

        public abstract get Descriptor(): PropertyDescriptor;
    }
}