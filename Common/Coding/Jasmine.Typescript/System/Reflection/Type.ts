
/// <reference path="./ConstructorInfo.ts" />
/// <reference path="./FieldInfo.ts" />
/// <reference path="./MethodInfo.ts" />
/// <reference path="./PropertyInfo.ts" />
/// <reference path="./ParameterInfo.ts" />

/// <reference path="./ICustomAttributeProvider.ts" />







namespace System.Reflection
{
    

    /**
     * object 派生类的构造器类型
     */
    export interface TypeConstructor< T extends object > extends Function
    {
        new ( ...args: any[] ): T;
        //prototype: T | TypePrototype< T >;
    };

    export interface TypeConstructorAbstract< T extends object > extends Function
    {
        prototype: T | TypePrototype< T >;
    }

    // export interface TypeConstructorNew< T extends object > extends Function
    // {
    //     new ( ...args: any[] ): T;
    // };

    
    /**
     * object 派生类的prototype类型
     */
    export interface TypePrototype< T extends object > extends Object
    {
        constructor: TypeConstructor< T >;
    };

    export function GetOrCreateDictionaryInJsPrototype< T extends {} >( prototype: TypePrototype< object >, key: string ) : T
    {
        let data: T = null;
        if ( prototype.hasOwnProperty( key ) == false )
        {
            data = (<any>prototype)[ key ] = <T>{};
        }
        else
        {
            data = (<any>prototype)[ key ];
        }
        return data;
    }

    export function GetOrCreateArrayInJsPrototype< T extends {} >( prototype: TypePrototype< object >, key: string ) : Array< T >
    {
        let data: Array< T > = null;
        if ( prototype.hasOwnProperty( key ) == false )
        {
            data = (<any>prototype)[ key ] = [];
        }
        else
        {
            data = (<any>prototype)[ key ];
        }
        return data;
    }

    export abstract class CType< T extends object = object > implements ICustomAttributeProvider
    {
        protected constructor()
        {
        }

        public abstract GetJsPrototype< TExtra extends {} = {} >(): TypePrototype< T > & TExtra;

        public abstract GetJsConstructor(): TypeConstructor< T >;

        public abstract GetConstructor(): CConstructorInfo;
    
        public GetFieldOne( name: string ): CFieldInfo
        {
            let info: CFieldInfo = this.GetOwnFieldOne( name );
            if ( info == null )
            {
                let baseType = this.BaseType;
                while ( baseType )
                {
                    info = baseType.GetOwnFieldOne( name );
                    if ( info != null )
                        return info;
    
                    baseType = baseType.BaseType;
                }
            }
            return info;
        }
    
        public abstract GetOwnFieldOne( name: string ): CFieldInfo;
    
        public GetFields(): CFieldInfo[]
        {
            let array = this.GetOwnFields();
            let baseType = this.BaseType;
            while ( baseType )
            {
                array = array.concat( baseType.GetOwnFields() );
                baseType = baseType.BaseType;
            }
            return array;
        }
    
        public abstract GetOwnFields(): CFieldInfo[]

        public GetMethodOne( key: string ): CMethodInfo
        {
            let info: CMethodInfo = this.GetOwnMethodOne( key );
            if ( info != null )
            {
                return info;
            }
            let baseType = this.BaseType;
            while ( baseType )
            {
                info = baseType.GetOwnMethodOne( key );
                if ( info != null )
                {
                    return info;
                }
                baseType = baseType.BaseType;
            }
            return null;
        }

        public abstract GetOwnMethodOne( key: string ): CMethodInfo;

        public GetMethods(): CMethodInfo[]
        {
            let array = this.GetOwnMethods();
            let baseType = this.BaseType;
            while ( baseType )
            {
                array = array.concat( baseType.GetOwnMethods() );
                baseType = baseType.BaseType;
            }
            return array;
        }

        public abstract GetOwnMethods(): CMethodInfo[];

        public GetProperties(): CPropertyInfo[]
        {
            let array = this.GetOwnProperties();
            let baseType = this.BaseType;
            while ( baseType )
            {
                array = array.concat( baseType.GetOwnProperties() );
                baseType = baseType.BaseType;
            }
            return array;
        }

        public GetProperty( key: string | symbol ): CPropertyInfo
        {
            let propertyInfo = this.GetOwnProperty( key );
            if ( propertyInfo != null )
                return propertyInfo;
            let baseType = this.BaseType;
            while ( baseType )
            {
                propertyInfo = baseType.GetOwnProperty( key );
                if ( propertyInfo != null )
                return propertyInfo;
            }
            return null;
        }

        public abstract GetOwnProperties(): CPropertyInfo[];

        public abstract GetOwnProperty( key: string | symbol ): CPropertyInfo;

        /**
         * **(只读)**
         * 
         * 获取父类类型
         */
        public abstract get BaseType(): CType;

        /**
         * 对比当前类型是否与参数type类型一样
         * @param type 对比参照类型
         */
        public abstract IsEquivalentTo( type: CType | TypeConstructor<object> ): boolean;

        /**
         * 判断当前类型是否继承于参数type类型
         * @param type 父类类型
         */
        public abstract IsInheritFrom( type: CType ): boolean;

        public abstract GetCustomAttributeOne< TAttribute extends CAttribute >( attributeType: CType< TAttribute >, inherit: boolean ): TAttribute;

        public abstract GetCustomAttributes< TAttribute extends CAttribute >( attributeType: CType< TAttribute >, inherit: boolean ): TAttribute[];

        public abstract GetCustomAttributesAll(): CAttribute[];

        public abstract IsDefined< TAttribute extends CAttribute >( attributeType: CType< TAttribute >, inherit: boolean ): boolean;
    }

    class CRuntimeType< T extends object = object > extends CType< T >
    {
        private readonly m_proto: TypePrototype< T > = null;

        private m_metadataCollection: Metadata.IMetadataCollectionReadonly = null;
    
        public constructor( proto: TypePrototype< T > )
        {
            super();
            this.m_proto = proto;
        }

        public GetJsPrototype< TExtra extends {} = {} >(): TypePrototype< T > & TExtra
        {
            return < TypePrototype< T > & TExtra >this.m_proto;
        }

        public GetJsConstructor(): TypeConstructor< T >
        {
            return this.m_proto.constructor;
        }

        public GetConstructor(): CConstructorInfo
        {
            return new CRuntimeConstructorInfo( "constructor", this.m_proto );
        }
    
        public GetFieldOne( name: string ): CFieldInfo
        {
            let info: CFieldInfo = this.GetOwnFieldOne( name );
            if ( info == null )
            {
                let baseType = this.BaseType;
                while ( baseType )
                {
                    info = baseType.GetOwnFieldOne( name );
                    if ( info != null )
                        return info;
    
                    baseType = baseType.BaseType;
                }
            }
            return info;
        }
    
        public GetOwnFieldOne( name: string ): CFieldInfo
        {
            let proto = this.GetJsPrototype();
            let info: CFieldInfo = null;
            let descriptor = Reflect.getOwnPropertyDescriptor( proto, ReflectFieldsKey );
            if ( descriptor == null || descriptor.value == null )
                return null;
            if ( ( name in descriptor.value ) == false )
                return null;
            info = new CRuntimeFieldInfo( name, proto );
            return info;
        }
    
        public GetFields(): CFieldInfo[]
        {
            let array = this.GetOwnFields();
            let baseType = this.BaseType;
            while ( baseType )
            {
                array = array.concat( baseType.GetOwnFields() );
                baseType = baseType.BaseType;
            }
            return array;
        }
    
        public GetOwnFields(): CFieldInfo[]
        {
            let proto = this.GetJsPrototype();
            let array: CFieldInfo[] = [];
            let descriptor = Reflect.getOwnPropertyDescriptor( proto, ReflectFieldsKey );
            if ( descriptor == null || descriptor.value == null )
                return array;
            let keys = descriptor.value;
            for ( const k in keys )
            {
                array.push( new CRuntimeFieldInfo( k, proto ) );
            }
            return array;
        }

        public GetMethodOne( key: string ): CMethodInfo
        {
            let info: CMethodInfo = this.GetOwnMethodOne( key );
            if ( info != null )
            {
                return info;
            }
            let baseType = this.BaseType;
            while ( baseType )
            {
                info = baseType.GetOwnMethodOne( key );
                if ( info != null )
                {
                    return info;
                }
                baseType = baseType.BaseType;
            }
            return null;
        }

        public GetOwnMethodOne( key: string ): CMethodInfo
        {
            let info: CMethodInfo = null;
            let descriptor = Reflect.getOwnPropertyDescriptor( this.m_proto, key );
            if ( descriptor == null )
                return null;
            info = new CRuntimeMethodInfo( key, this.m_proto, descriptor.value );
            return info;
        }

        public GetMethods(): CMethodInfo[]
        {
            let array = this.GetOwnMethods();
            let baseType = this.BaseType;
            while ( baseType )
            {
                array = array.concat( baseType.GetOwnMethods() );
                baseType = baseType.BaseType;
            }
            return array;
        }

        public GetOwnMethods(): CMethodInfo[]
        {
            let array: CMethodInfo[] = [];
            let keys = Reflect.ownKeys( this.m_proto );
            for ( const k of keys )
            {
                if ( k == "constructor" )
                    continue;
                let descriptor = Reflect.getOwnPropertyDescriptor( this.m_proto, k );
                if ( descriptor == null )
                    continue;
                if ( descriptor.value == null || typeof( descriptor.value ) != "function" )
                    continue;
                array.push( new CRuntimeMethodInfo( <string>k, this.m_proto, descriptor.value ) );
            }
            return array;
        }

        public GetProperties(): CPropertyInfo[]
        {
            let array = this.GetOwnProperties();
            let baseType = this.BaseType;
            while ( baseType )
            {
                array = array.concat( baseType.GetOwnProperties() );
                baseType = baseType.BaseType;
            }
            return array;
        }

        public GetProperty( key: string | symbol ): CPropertyInfo
        {
            let propertyInfo = this.GetOwnProperty( key );
            if ( propertyInfo != null )
                return propertyInfo;
            let baseType = this.BaseType;
            while ( baseType )
            {
                propertyInfo = baseType.GetOwnProperty( key );
                if ( propertyInfo != null )
                return propertyInfo;
            }
            return null;
        }

        public GetOwnProperties(): CPropertyInfo[]
        {
            let array: CPropertyInfo[] = [];
            let keys = Reflect.ownKeys( this.m_proto );
            for ( const k of keys )
            {
                if ( k == "constructor" )
                    continue;
                let descriptor = Reflect.getOwnPropertyDescriptor( this.m_proto, k );
                if ( descriptor == null )
                    continue;
                if ( descriptor.set == null && descriptor.get == null )
                    continue;
                array.push( new CRuntimePropertyInfo( <string>k, this.m_proto ) );
            }
            return array;
        }

        public GetOwnProperty( key: string | symbol ): CPropertyInfo
        {
            let descriptor = Reflect.getOwnPropertyDescriptor( this.m_proto, key );
            if ( descriptor == null )
                return null;
            if ( descriptor.set == null && descriptor.get == null )
                return null;
            return new CRuntimePropertyInfo( <string>key, this.m_proto );
        }

        /**
         * **(只读)**
         * 
         * 获取父类类型
         */
        public get BaseType(): CType
        {
            let protoBase = Reflect.getPrototypeOf( this.m_proto );
            if ( protoBase == null )
                return null;
            if ( protoBase == Object.prototype )
                return null;
            return new CRuntimeType( <TypePrototype<object>>protoBase );
        }

        /**
         * 对比当前类型是否与参数type类型一样
         * @param type 对比参照类型
         */
        public IsEquivalentTo( type: CRuntimeType | TypeConstructor<object> ): boolean
        {
            if ( typeof( type ) == "function" )
                return type.prototype == this.m_proto;
            if ( type.m_proto === this.m_proto )
                return true;
            return false;
        }

        /**
         * 判断当前类型是否继承于参数type类型
         * @param type 父类类型
         */
        public IsInheritFrom( type: CType ): boolean
        {
            let baseType = this.BaseType;
            while ( baseType )
            {
                if ( baseType.IsEquivalentTo( type ) )
                    return true;
                baseType = baseType.BaseType;
            }
            return false;
        }

        private get MetadataCollection(): Metadata.IMetadataCollectionReadonly
        {
            if ( this.m_metadataCollection == null )
            {
                let key = new Metadata.Core.CMetadataKeyForClass( this, UAttributeTarget.Class );
                this.m_metadataCollection = Metadata.Container.GetCollection( key );
            }
            return this.m_metadataCollection;
        }

        public GetCustomAttributeOne< TAttribute extends CAttribute >( attributeType: CType< TAttribute >, inherit: boolean ): TAttribute
        {
            if ( this.IsEquivalentTo( CAttributeUsageAttribute ) == true )
                return null;

            if ( inherit == true )
            {
                let attr = this.GetCustomAttributeOne( attributeType, false );
                if ( attr != null )
                    return attr;

                let attrUsage = attributeType.GetCustomAttributeOne( Reflection.TypeOf( CAttributeUsageAttribute ), true );
                if ( attrUsage == null )
                    attrUsage = CAttributeUsageAttribute.DefaultUsage;

                if ( attrUsage.Inherited == true )
                {
                    let baseType = this.BaseType;
                    while ( baseType != null )
                    {
                        attr = baseType.GetCustomAttributeOne( attributeType, false );
                        if ( attr != null )
                            return attr;
                        baseType = baseType.BaseType;
                    }
                }

                return null;
            }
            else
            {
                return this.MetadataCollection.GetAttributeOne( attributeType );
            }
        }

        public GetCustomAttributes< TAttribute extends CAttribute >( attributeType: CType< TAttribute >, inherit: boolean ): TAttribute[]
        {
            if ( inherit == true )
            {
                let attrs = this.GetCustomAttributes( attributeType, false );
                let attrUsage = attributeType.GetCustomAttributeOne( Reflection.TypeOf( CAttributeUsageAttribute ), true );
                if ( attrUsage == null )
                {
                    attrUsage = CAttributeUsageAttribute.DefaultUsage;
                }
                if ( attrUsage.Inherited == true )
                {
                    let baseType = this.BaseType;
                    while ( baseType != null )
                    {
                        attrs = attrs.concat( baseType.GetCustomAttributes( attributeType, false ) );
                        baseType = baseType.BaseType;
                    }
                }
                return attrs;
            }
            else
            {
                return this.MetadataCollection.GetAttributes( attributeType );
            }
        }

        public GetCustomAttributesAll(): CAttribute[]
        {
            return this.MetadataCollection.GetAttributesAll();
        }

        public IsDefined< TAttribute extends CAttribute >( attributeType: CType< TAttribute >, inherit: boolean ): boolean
        {
            return false;
        }
    }
    
    export function TypeOf< T extends object >( type: TypeConstructor< T > | TypeConstructorAbstract< T > ): CType< T >
    {
        return new CRuntimeType( type.prototype );
    }

    export function TypeOf__< T extends object >( prototype: TypePrototype< T > ): CType< T >
    {
        return new CRuntimeType( prototype );
    }



    class CRuntimeConstructorInfo extends CConstructorInfo
    {
        public constructor( name: string, prototype: TypePrototype< object > )
        {
            super( name, prototype );
        }

        public get MemberType(): UMemberTypes
        {
            return UMemberTypes.Constructor;
        }

        public GetParameters(): CParameterInfo[]
        {
            let classType = this.DeclaringType;
            let parameterCount = this.JsConstructor.length;
            let infos: Array< CParameterInfo > = Array( parameterCount );
            if ( parameterCount > 0 )
            {
                for ( let i = 0; i < parameterCount; i ++ )
                {
                    let key = new Metadata.Core.CMetadataKeyForParameter( classType, UAttributeTarget.Parameter, this.Name, i );
                    let typeAttribute = Metadata.Container.GetCollection( key ).GetAttributeOne( TypeOf( CDeclaringTypeAttribute ) );
                    infos[ i ] = new CRuntimeParameterInfo( this.m_prototype, this, i, ( typeAttribute == null ) ? null : typeAttribute.DeclaringType );
                }
            }
            return infos;
        }

        public get Descriptor(): PropertyDescriptor
        {
            return null;
        }
    }


    class CRuntimeMethodInfo extends CMethodInfo
    {
        private readonly m_method: Function = null;
        private readonly m_fromProperty: CPropertyInfo = null;

        public constructor( name: string, prototype: TypePrototype< any >, method: Function, fromProperty?: CPropertyInfo )
        {
            super( name, prototype );
            this.m_method = method;
            this.m_fromProperty = fromProperty;
        }

        public get MemberType(): UMemberTypes
        {
            return UMemberTypes.Method;
        }

        protected get Method(): Function
        {
            return this.m_method;
        }

        public GetParameters(): CParameterInfo[]
        {
            let classType = this.DeclaringType;
            let parameterCount = this.Method.length;
            let infos: Array< CParameterInfo > = Array( parameterCount );
            if ( parameterCount > 0 )
            {
                for ( let i = 0; i < parameterCount; i ++ )
                {
                    let typeAttribute: CDeclaringTypeAttribute = null;
                    if ( this.m_fromProperty == null )
                    {
                        let key = new Metadata.Core.CMetadataKeyForParameter( classType, UAttributeTarget.Parameter, this.Name, i );
                        typeAttribute = Metadata.Container.GetCollection( key ).GetAttributeOne( TypeOf( CDeclaringTypeAttribute ) );
                    }
                    else
                    {
                        typeAttribute = this.m_fromProperty.GetCustomAttributeOne( TypeOf( CDeclaringTypeAttribute ) );
                        
                    }
                    infos[ i ] = new CRuntimeParameterInfo( this.m_prototype, this, i, ( typeAttribute == null ) ? null : typeAttribute.DeclaringType );
                }
            }
            return infos;
        }

        public get Descriptor(): PropertyDescriptor
        {
            if ( this.m_fromProperty == null )
                return Reflect.getOwnPropertyDescriptor( this.m_prototype, this.Name );
            return Reflect.getOwnPropertyDescriptor( this.m_prototype, this.m_fromProperty.Name );
        }
    }


    class CRuntimePropertyInfo extends CPropertyInfo
    {
        public constructor( name: string, prototype: TypePrototype< object > )
        {
            super( name, prototype );
        }

        public get MemberType(): UMemberTypes
        {
            return UMemberTypes.Property;
        }
        
        public get PropertyType(): CType
        {
            let attr = this.GetCustomAttributeOne( TypeOf( CDeclaringTypeAttribute ) );
            if ( attr == null )
                return null;
            return attr.DeclaringType;
        }

        public SetValue( obj: any, value: any ): void
        {
            obj[ this.m_name ] = value;
        }

        public GetValue( obj: any ): any
        {
            return obj[ this.m_name ];
        }

        public GetMetadataKey(): Metadata.Core.CMetadataKey
        {
            return new Metadata.Core.CMetadataKeyForNamed( this.DeclaringType, UAttributeTarget.Property, this.Name );
        }

        public get CanWrite(): boolean
        {
            let descriptor = Reflect.getOwnPropertyDescriptor( this.m_prototype, this.m_name );
            return descriptor.set != undefined;
        }

        public get CanRead(): boolean
        {
            let descriptor = Reflect.getOwnPropertyDescriptor( this.m_prototype, this.m_name );
            return descriptor.get != undefined;
        }

        public GetSetMethod(): CMethodInfo
        {
            let descriptor = Reflect.getOwnPropertyDescriptor( this.m_prototype, this.m_name );
            if ( descriptor.set == undefined )
                return undefined;
            return new CRuntimeMethodInfo( "get_" + this.Name, this.m_prototype, descriptor.set, this );
        }

        public GetGetMethod(): CMethodInfo
        {
            let descriptor = Reflect.getOwnPropertyDescriptor( this.m_prototype, this.m_name );
            if ( descriptor.get == undefined )
                return undefined;
            return new CRuntimeMethodInfo( "get_" + this.Name, this.m_prototype, descriptor.get, this );
        }
    }


    class CRuntimeFieldInfo extends CFieldInfo
    {
        public constructor( name: string, prototype: TypePrototype< object > )
        {
            super( name, prototype );
        }
    }


    class CRuntimeParameterInfo extends CParameterInfo
    {
        protected m_prototype: TypePrototype< object > = null;
        // protected m_methodName: string = null;
        // protected m_descriptor: PropertyDescriptor = null;
        private readonly m_member: CMemberInfo = null;
        protected m_parameterIndex: number = null;
        private readonly m_parameterType: CType = null;

        private m_metadataCollection: Metadata.IMetadataCollectionReadonly = null;

        public constructor( prototype: TypePrototype< object >, member: CMemberInfo, parameterIndex: number, parameterType: CType )
        {
            super();
            this.m_prototype = prototype;
            this.m_member = member;
            this.m_parameterIndex = parameterIndex;
            this.m_parameterType = parameterType;
        }

        public get DeclaringType(): CType< object >
        {
            return new CRuntimeType( this.m_prototype );
        }

        public get ParameterIndex()
        {
            return this.m_parameterIndex;
        }

        public get ParameterType(): CType
        {
            return this.m_parameterType;
        }

        public GetMetadataKey(): Metadata.Core.CMetadataKey
        {
            return new Metadata.Core.CMetadataKeyForParameter( this.DeclaringType, UAttributeTarget.Parameter, this.m_member.Name, this.ParameterIndex );
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
    }
}


