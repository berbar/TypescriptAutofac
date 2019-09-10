
/// <reference path="./MemberInfo.ts" />


namespace System.Reflection
{
    export abstract class CMethodBase extends CMemberInfo
    {
        public abstract GetParameters(): Array< CParameterInfo >;

        public abstract get Descriptor(): PropertyDescriptor;
    }
}