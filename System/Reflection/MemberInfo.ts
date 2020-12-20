

namespace iberbar.System.Reflection
{
    export type UMemberSymbol = string;

    export abstract class CMemberInfo implements ICustomAttributeProvider
    {
        protected readonly m_name: UMemberSymbol = null;
        protected readonly m_prototype: TypePrototype< object > = null;

        private m_metadataCollection: Metadata.IMetadataCollectionReadonly = null;

        protected constructor( name: UMemberSymbol, prototype: TypePrototype< object > )
        {
            this.m_name = name;
            this.m_prototype = prototype;
        }

        public abstract get MemberType(): UMemberTypes;

        public get Name(): UMemberSymbol
        {
            return this.m_name;
        }

        /**
         * Gets the class that declares this member.
         * 
         * 声明此成员的Class类型，下面实例中的Text属性MemberInfo的DeclaringType返回 **Biubiu**
         * 
         * @returns The Type object for the class that declares this member.
         * 
         * ```js
         * class Biubiu
         * {
         *      get Text(): string { return  ""; }
         * }
         * ```
         */
        public get DeclaringType(): CType< object >
        {
            return TypeOf( this.m_prototype.constructor );
        }

        public GetJsPrototype< TExtra extends {} = {} >(): TypePrototype< object > & TExtra
        {
            return <any>this.m_prototype;
        }

        private get MetadataCollection(): Metadata.IMetadataCollectionReadonly
        {
            if ( this.m_metadataCollection == null )
            {
                let key = this.GetMetadataKey();
                this.m_metadataCollection = Metadata.Container.GetCollection( key );
            }
            return this.m_metadataCollection;
        }

        public GetCustomAttributeOne< TAttribute extends CAttribute >( attributeType: CType< TAttribute > ): TAttribute
        {
            return this.MetadataCollection.GetAttributeOne( attributeType );
        }

        public GetCustomAttributes< TAttribute extends CAttribute >( attributeType: CType< TAttribute > ): TAttribute[]
        {
            return this.MetadataCollection.GetAttributes( attributeType );
        }

        public GetCustomAttributesAll(): CAttribute[]
        {
            return this.MetadataCollection.GetAttributesAll();
        }

        public IsDefined< TAttribute extends CAttribute >( attributeType: CType< TAttribute > ): boolean
        {
            return ( this.MetadataCollection.GetAttributeOne( attributeType ) == null ) ? false : true;
        }

        public GetMetadataKey(): Metadata.Core.CMetadataKey
        {
            throw new Error( "Method not implemented." );
        }
    }
}