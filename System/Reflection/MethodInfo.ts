
/// <reference path="./MemberInfo.ts" />

/// <reference path="./CMethodBase.ts" />


namespace iberbar.System.Reflection
{
    export abstract class CMethodInfo extends CMethodBase
    {
        // protected readonly m_method: Function = null;

        // protected constructor( n: string, prototype: TypePrototype< any >, method: Function )
        // {
        //     super( n, prototype );
        //     this.m_method = method;
        // }

        public Invoke( obj: any, ...args: any[] ): any
        {
            return this.Method.apply( obj, args );
        }

        // public GetParameters(): Array< CParameterInfo >
        // {
        //     let classType = this.DeclaringType;
        //     let parameterCount = this.Method.length;
        //     let infos: Array< CParameterInfo > = Array( parameterCount );
        //     if ( parameterCount > 0 )
        //     {
        //         for ( let i = 0; i < parameterCount; i ++ )
        //         {
        //             let key: Metadata.Core.CMetadataKey = null;
        //             if ( this.Name.startsWith( "get_" ) || this.Name.startsWith( "set_" ) )
        //             {
        //                 key = new Metadata.Core.CMetadataKeyForNamed( classType, UAttributeTarget.Property, this.Name.substr( 4 ) );
        //             }
        //             else
        //             {
        //                 key = new Metadata.Core.CMetadataKeyForParameter( classType, UAttributeTarget.Parameter, this.Name, i );
        //             }
        //             let typeAttribute = Metadata.Container.GetCollection( key ).GetAttributeOne( TypeOf( CDeclaringTypeAttribute ) );
        //             infos[ i ] = new CParameterInfo( this.m_prototype, this, i, ( typeAttribute == null ) ? null : typeAttribute.DeclaringType );
        //         }
        //     }
        //     return infos;
        // }

        // public get Descriptor()
        // {
        //     return Reflect.getOwnPropertyDescriptor( this.m_prototype, this.m_name );
        // }

        public GetMetadataKey(): Metadata.Core.CMetadataKey
        {
            return new Metadata.Core.CMetadataKeyForNamed( this.DeclaringType, UAttributeTarget.Method, this.Name );
        }

        protected abstract get Method(): Function;
    }
}