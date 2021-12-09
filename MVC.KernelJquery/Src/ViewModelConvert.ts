

namespace iberbar.MVC.KernelJquery.ViewModelConvert
{
            /**
     * 将data数据反射到当前的ViewModel中
     * @param data 数据
     */
    export function FromObject( model: object, data: any ): void
    {
        let modelType = model.GetType();
        let fieldInfos = modelType.GetFields();
        for ( let i = 0; i < fieldInfos.length; i ++ )
        {
            let fi = fieldInfos[ i ];
            let attrFromElement = fi.GetCustomAttributeOne( System.Reflection.TypeOf( Attributes.FromElementAttribute ) );
            if ( attrFromElement == null )
                continue;
            let element: JQuery = fi.GetValue( model );
            if ( element == null || element.length == 0 )
                continue;
            let dataValue = data[ fi.Name ];
            let dataType = typeof( dataValue );
            if ( dataValue == null )
                continue;
            if ( dataType == "boolean" )
            {
                element.prop( "checked", dataValue );
            }
            else if ( dataType == "string" || dataType == "number" )
            {
                element.val( dataValue );
            }
        }
        let propertyInfos = modelType.GetProperties();
        for ( let i = 0; i < propertyInfos.length; i ++ )
        {
            let pi = propertyInfos[ i ];
            let dataValue = data[ pi.Name ];
            let dataType = typeof( dataValue );
            if ( dataValue == null )
                continue;
            pi.SetValue( model, dataValue );
        }
    }

    /**
     * 将当前的ViewModel模型反射到数据
     * @param type 数据类型
     */
    export function ToObject< T extends object >( model: object, type: System.Reflection.CType< T > ): T
    {
        let obj = type.GetConstructor().Invoke();
        let modelType = model.GetType();
        let fieldInfos = modelType.GetFields();
        for ( let i = 0; i < fieldInfos.length; i ++ )
        {
            let fi = fieldInfos[ i ];
            let attrFromElement = fi.GetCustomAttributeOne( System.Reflection.TypeOf( Attributes.FromElementAttribute ) );
            if ( attrFromElement == null )
                continue;
            let fi_obj = type.GetFieldOne( fi.Name );
            if ( fi_obj == null )
                continue;
            let attrDeclaringType = fi_obj.GetCustomAttributeOne( System.Reflection.TypeOf( System.Reflection.CDeclaringTypeAttribute ) );
            if ( attrDeclaringType == null )
                continue;
            let element = <JQuery>fi.GetValue( model );
            let dataValueType = attrDeclaringType.DeclaringType;
            let dataValue: any = null;
            if ( dataValueType.IsEquivalentTo( System.Reflection.TypeOf( Number ) ) )
            {
                dataValue = Number( element.val() );
                if ( Number.isNaN( dataValue ) )
                    dataValue = null;
            }
            else if ( dataValueType.IsEquivalentTo( System.Reflection.TypeOf( String ) ) )
            {
                dataValue = element.val().toString();
            }
            else if ( dataValueType.IsEquivalentTo( System.Reflection.TypeOf( Boolean ) ) )
            {
                dataValue = element.prop( "checked" );
            }
            fi_obj.SetValue( obj, dataValue );
        }
        return <T>obj;
    }
}

