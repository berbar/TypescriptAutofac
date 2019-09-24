
/// <reference path="./MemberInfo.ts" />


namespace iberbar.System.Reflection
{
    export abstract class CPropertyInfo extends CMemberInfo
    {
        public abstract get PropertyType(): CType;

        public abstract SetValue( obj: any, value: any ): void;

        public abstract GetValue( obj: any ): any;

        public GetMetadataKey(): Metadata.Core.CMetadataKey
        {
            return new Metadata.Core.CMetadataKeyForNamed( this.DeclaringType, UAttributeTarget.Property, this.Name );
        }

        public abstract get CanWrite(): boolean;

        public abstract get CanRead(): boolean

        public abstract GetSetMethod(): CMethodInfo;

        public abstract GetGetMethod(): CMethodInfo;
    }
}