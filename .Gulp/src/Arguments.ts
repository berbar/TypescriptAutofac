import { iberbar } from "../../dist/commonjs/jasmine";



export interface IArgumentCollection
{
}

export class CArgumentNameAttribute extends iberbar.System.CAttribute
{
    public constructor( names: { long?: string, short?: string } )
    {
        super();
    }
}

export function ArgumentName(): iberbar.System.UDecoratorFunctionType_ForProperty
{
    return iberbar.System.AttributeDecorate( new CArgumentNameAttribute( null ) );
}

export class CArgumentEnumValueAttribute extends iberbar.System.CAttribute
{
    public constructor( values: Array< string > )
    {
        super();
    }
}

export function ArgumentEnumValue( ...values: Array< string > ): iberbar.System.UDecoratorFunctionType_ForProperty
{
    return iberbar.System.AttributeDecorate( new CArgumentEnumValueAttribute( values ) );
}

interface ICollectionContructor<T extends object>
{
    new (): T;
}

export class CArgumnetsCollection
{
    protected readonly m_argv: Array< { name?: string, values?: Array< string > } > = Array();

    public constructor( argv: string[] )
    {
        for ( let i = 0; i < argv.length; i ++ )
        {
            const a = argv[ i ];
            if ( a.startsWith( "--" ) )
            {
                if ( ( i + 1 ) < argv.length )
                {
                    const b = argv[ i + 1 ];
                }
                else
                {

                }
            }
            else if ( a.startsWith( "-" ) )
            {
                if ( ( i + 1 ) < argv.length )
                {
                    const b = argv[ i + 1 ];
                }
                else
                {
                    
                }
            }
            else
            {

            }
        }
    }

    public ReflectObject<T extends object>( t: iberbar.System.Reflection.CType ): T
    {
        return null;
    }
}

export function ReflectArgumentsCollection<T extends object>( t: iberbar.System.Reflection.CType ): T
{
    let argvNew: Array< { name?: string, values?: Array< string > } > = Array();
    for ( let i = 0; i < process.argv.length; i ++ )
    {
        const a = process.argv[ i ];
    }
    let collection = t.GetConstructor().Invoke();
    let properties = t.GetProperties();
    for ( const pi of properties )
    {

    }
    return <T>collection;
}


export function FindArgument( key: string ): string
{
    let pos = process.argv.indexOf( "--" + key );
    if ( pos < 0 )
        return null;
    if ( pos == ( process.argv.length - 1 ) )
        return "";
    let val = process.argv[ pos + 1 ];
    if ( val.startsWith( "--" ) )
        return "";
    return val;
}

export function FindArguments( key: string ): string[]
{
    let values = [];
    key = "--" + key;
    for ( let i = 0; i < process.argv.length; )
    {
        const a = process.argv[ i ];
        if ( a == key )
        {
            const v = process.argv[ i + 1 ];
            if ( v.startsWith( "-" ) )
            {
                //values.push( "" );
                i ++;
            }
            else
            {
                values.push( v );
                i += 2;
            }
            
        }
        else
        {
            i ++;
        }
    }
    return values;
}

export function HasArgument( key: string ): boolean
{
    return process.argv.indexOf( "--" + key ) >= 0;
}