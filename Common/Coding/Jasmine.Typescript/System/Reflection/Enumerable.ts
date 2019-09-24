

namespace iberbar.System.Reflection
{
    export const ReflectFieldsKey = "Jasmine::System::Reflect::Fields";

    export function Enumerable( target: any, propertyName: string, descriptor?: PropertyDescriptor ): void
    {
        if ( descriptor == null )
        {
            let fieldsDescriptor: PropertyDescriptor = null;
            // 检查是否存在相同名称的field字段
            // let protoBase = Reflect.getPrototypeOf( target );
            // while ( protoBase )
            // {
            //     if ( protoBase == null )
            //         break;
            //     if ( protoBase == Object.prototype )
            //         break;

            //     fieldsDescriptor = Reflect.getOwnPropertyDescriptor( protoBase, ReflectFieldsKey );
            //     if ( fieldsDescriptor != null && fieldsDescriptor.value != null && ( propertyName in fieldsDescriptor.value ) )
            //         return;
                
            //     protoBase = Reflect.getPrototypeOf( protoBase );
            // }

            fieldsDescriptor = Reflect.getOwnPropertyDescriptor( target, ReflectFieldsKey );
            let fields = null;
            if ( fieldsDescriptor == null )
            {
                fields = {};
                Reflect.defineProperty( target, ReflectFieldsKey, { value: fields, enumerable: true } );
            }
            else
            {
                fields = fieldsDescriptor.value;
            }
            fields[ propertyName ] = {};
        }
        else
        {
            descriptor.enumerable = true;
        }
    }



}