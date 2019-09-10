

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