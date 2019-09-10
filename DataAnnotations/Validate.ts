
namespace DataAnnotations
{
    export function Validate( data: object ): { fieldName: string, errorText: string }
    {
        let dataType = data.GetType();
        let fieldInfos = dataType.GetFields();
        for ( const fi of fieldInfos )
        {
            let attrDisplayName = fi.GetCustomAttributeOne( System.Reflection.TypeOf( Core.CDisplayName ) );
            let context = new CValidationContext( data );
            context.MemberName = <string>fi.Name;
            context.DisplayName = ( attrDisplayName == null ) ? <string>fi.Name : attrDisplayName.Name;
            let attrValidationArray = fi.GetCustomAttributes( System.Reflection.TypeOf( Core.CValidationAttribute ) );
            let dataValue = fi.GetValue( data );
            if ( attrValidationArray.length > 0 )
            {
                for ( const attr of attrValidationArray )
                {
                    if ( attr.Validate( dataValue, context ) == false )
                    {
                        let errorText = attr.FormatErrorMessage( context.DisplayName );
                        return {
                            fieldName: <string>fi.Name,
                            errorText: errorText
                        };
                    }
                }
            }
        }
        return null;
    }
}