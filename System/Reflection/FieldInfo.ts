/// <reference path="./MemberInfo.ts" />



namespace iberbar.System.Reflection
{
    export abstract class CFieldInfo extends CMemberInfo
    {
        public get MemberType(): UMemberTypes
        {
            return UMemberTypes.Field;
        }

        public SetValue( obj: object, value: any ): void
        {
            (<any>obj)[ this.m_name ] = value;
        }

        public GetValue( obj: object ): any
        {
            return (<any>obj)[ this.m_name ];
        }

        public GetMetadataKey(): Metadata.Core.CMetadataKey
        {
            return new Metadata.Core.CMetadataKeyForNamed( this.DeclaringType, UAttributeTarget.Field, this.Name );
        }

        public abstract get FieldType(): CType;
    }
}