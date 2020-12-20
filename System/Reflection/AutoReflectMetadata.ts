

namespace iberbar.System.Reflection
{
    /**
     * 自动映射构造函数的参数类型
     * 
     * 需要tsconfig配置 "emitDecoratorMetadata": true
     * @param target 
     */
    export function AutoReflectMetadata_Constructor( target: any ): any
    {
        let paramtypes: Array< TypeConstructor<any> > = Reflect.getMetadata( "design:paramtypes", target );
        // if ( paramtypes == null )
        //     throw new Error( '需要tsconfig配置 "emitDecoratorMetadata": true' );
        if ( paramtypes != null )
        {
            for ( let parameterIndex = 0; parameterIndex < paramtypes.length; parameterIndex ++ )
            {
                let key = new Metadata.Core.CMetadataKeyForParameter( Reflection.TypeOf__( target.prototype ), UAttributeTarget.Parameter, "constructor", parameterIndex );
                let attribute = new CDeclaringTypeAttribute( () => TypeOf( paramtypes[ parameterIndex ] ), null );
                Metadata.Container.GetOrAddCollection( key ).AddAttribute( attribute );
            }
        }
    }

    //     /**
    //  * 自动映射构造函数的参数类型
    //  * 
    //  * 需要tsconfig配置 "emitDecoratorMetadata": true
    //  * @param target 
    //  */
    // export function AutoReflectMetadata_Constructor()
    // {
    //     return function( target: any ): any
    //     {
    //         let paramtypes: Array< TypeConstructor<any> > = Reflect.getMetadata( "design:paramtypes", target );
    //         // if ( paramtypes == null )
    //         //     throw new Error( '需要tsconfig配置 "emitDecoratorMetadata": true' );
    //         if ( paramtypes != null )
    //         {
    //             for ( let parameterIndex = 0; parameterIndex < paramtypes.length; parameterIndex ++ )
    //             {
    //                 let key = new Metadata.Core.CMetadataKeyForParameter( Reflection.TypeOf__( target.prototype ), UAttributeTarget.Parameter, "constructor", parameterIndex );
    //                 let attribute = new CDeclaringTypeAttribute( TypeOf( paramtypes[ parameterIndex ] ), null );
    //                 Metadata.Container.GetOrAddCollection( key ).AddAttribute( attribute );
    //             }
    //         }
    //     }
    // }

    /**
     * 自动映射字段类型
     * 
     * 需要tsconfig配置 "emitDecoratorMetadata": true
     */
    export function AutoReflectMetadata_Field( target: any, fieldName: string ): any
    {
        Enumerable( target, fieldName );
        
        let typeConstructor = Reflect.getMetadata( "design:type", target, fieldName );
        // if ( typeConstructor == null )
        //     throw new Error( '需要tsconfig配置 "emitDecoratorMetadata": true' );
        if ( typeConstructor != null )
        {
            let key = new Metadata.Core.CMetadataKeyForNamed( Reflection.TypeOf__( target ), UAttributeTarget.Field, fieldName );
            let attribute = new CDeclaringTypeAttribute( () => TypeOf( typeConstructor ), null );
            Metadata.Container.GetOrAddCollection( key ).AddAttribute( attribute );
        }
    }

    /**
     * 自动映射属性类型
     * 
     * 需要tsconfig配置 "emitDecoratorMetadata": true
     */
    export function AutoReflectMetadata_Property( target: any, propertyName: string, descriptor: PropertyDescriptor ): any
    {
        if ( descriptor.set == null && descriptor.get == null )
            throw new Error( "Can't auto reflect on method." );
        let typeConstructor = Reflect.getMetadata( "design:type", target, propertyName );
        // if ( typeConstructor == null )
        //     throw new Error( '需要tsconfig配置 "emitDecoratorMetadata": true' );
        if ( typeConstructor != null )
        {
            let key = new Metadata.Core.CMetadataKeyForNamed( Reflection.TypeOf__( target ), UAttributeTarget.Property, propertyName );
            let attribute = new CDeclaringTypeAttribute( () => TypeOf( typeConstructor ), null );
            Metadata.Container.GetOrAddCollection( key ).AddAttribute( attribute );
        }
    }

    /**
     * 自动映射方法的返回类型和参数类型
     * 
     * 需要tsconfig配置 "emitDecoratorMetadata": true
     */
    export function AutoReflectMetadata_Method( target: any, methodName: string, descriptor: PropertyDescriptor ): any
    {
        if ( descriptor.set != null || descriptor.get != null )
            throw new Error( "Can't auto reflect on property." );

        let key: Metadata.Core.CMetadataKey;
        let attribute: CAttribute;

        let returntypeConstructor = Reflect.getMetadata( "design:returntype", target, methodName );
        // if ( returntypeConstructor == null )
        //     throw new Error( '需要tsconfig配置 "emitDecoratorMetadata": true' );
        if ( returntypeConstructor != null )
        {
            key = new Metadata.Core.CMetadataKeyForNamed( Reflection.TypeOf__( target ), UAttributeTarget.Method, methodName );
            attribute = new CDeclaringTypeAttribute( () => TypeOf( returntypeConstructor ), null );
            Metadata.Container.GetOrAddCollection( key ).AddAttribute( attribute );
        }

        let paramtypeConstructors: Array< TypeConstructor<any> > = Reflect.getMetadata( "design:paramtypes", target );
        // if ( paramtypeConstructors == null )
        //     throw new Error( '需要tsconfig配置 "emitDecoratorMetadata": true' );
        if ( paramtypeConstructors != null )
        {
            for ( let parameterIndex = 0; parameterIndex < paramtypeConstructors.length; parameterIndex ++ )
            {
                let key = new Metadata.Core.CMetadataKeyForParameter( Reflection.TypeOf__( target.prototype ), UAttributeTarget.Parameter, methodName, parameterIndex );
                let attribute = new CDeclaringTypeAttribute( () => TypeOf( paramtypeConstructors[ parameterIndex ] ), null );
                Metadata.Container.GetOrAddCollection( key ).AddAttribute( attribute );
            }
        }
    }
}