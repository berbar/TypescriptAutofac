/// <reference path="../../System/JsArrayExtension.d.ts" />


import iberbar from "../../dist/commonjs/jasmine";



export interface IArgumentCollection
{
    ReflectObject<T extends object>( t: iberbar.System.Reflection.CType<T> ): T;
}

export class CArgumentNameAttribute extends iberbar.System.CAttribute
{
    private readonly m_name: string = null;

    public constructor( name: string )
    {
        super();
        this.m_name = name;
    }

    public get Name(): string
    {
        return this.m_name;
    }
}

export function ArgumentName( name: string ): iberbar.System.UDecoratorFunctionType_ForProperty & iberbar.System.UDecoratorFunctionType_ForField
{
    return iberbar.System.AttributeDecorate( new CArgumentNameAttribute( name ) );
}

export class CArgumentEnumValueAttribute extends iberbar.System.CAttribute
{
    private readonly m_values: Array< string > = Array();

    public constructor( values: Array< string > )
    {
        super();
        this.m_values = values;
    }

    public get Values(): ReadonlyArray< string >
    {
        return this.m_values;
    }
}

export function ArgumentEnumValue( ...values: Array< string > ): iberbar.System.UDecoratorFunctionType_ForProperty & iberbar.System.UDecoratorFunctionType_ForField
{
    return iberbar.System.AttributeDecorate( new CArgumentEnumValueAttribute( values ) );
}

export class CArgumnetsCollection implements IArgumentCollection
{
    protected readonly m_argv: ReadonlyArray< string > = null;

    public constructor( argv: ReadonlyArray< string > )
    {
        this.m_argv = argv;
    }

    public ReflectObject<T extends object>( t: iberbar.System.Reflection.CType ): T
    {
        let collection = t.GetConstructor().Invoke();
        let fields = t.GetFields();
        for ( const fi of fields )
        {
            this.ReflectProperty( collection, fi );
        }
        let properties = t.GetFields();
        for ( const pi of properties )
        {
            this.ReflectProperty( collection, pi );
        }
        return <T>collection;
    }

    private ReflectProperty( collection: object, pi: iberbar.System.Reflection.CFieldInfo | iberbar.System.Reflection.CPropertyInfo ): void
    {
        let nameAttr = pi.GetCustomAttributeOne( iberbar.System.Reflection.TypeOf( CArgumentNameAttribute ) );
        if ( nameAttr == null )
            return;

        let typeAttr = pi.GetCustomAttributeOne( iberbar.System.Reflection.TypeOf( iberbar.System.Reflection.CDeclaringTypeAttribute ) );
        if ( typeAttr == null )
            return;

        let pv: Array< any > = null;
        let findOne = false;
        let argumentType: iberbar.System.Reflection.CType = null;
        if ( typeAttr.DeclaringType.IsEquivalentTo( Array ) )
        {
            findOne = true;
            argumentType = typeAttr.GenericTypes.firstOrDefault();
        }
        else
        {
            argumentType = typeAttr.DeclaringType;
        }

        if ( argumentType.IsEquivalentTo( String ) )
        {
            pv = this.FindStrings( nameAttr.Name, findOne );
        }
        else if ( argumentType.IsEquivalentTo( Number ) )
        {
            pv = this.FindNumbers( nameAttr.Name, findOne );
        }
        else if ( argumentType.IsEquivalentTo( Boolean ) )
        {
            pv = [ this.FindBoolean( nameAttr.Name ) ];
        }

        if ( findOne == true )
        {
            pi.SetValue( collection, pv.firstOrDefault() );
        }
        else
        {
            pi.SetValue( collection, pv );
        }
    }

    private FindStrings( name: string, findOne: boolean ): Array< string >
    {
        let array: Array< string > = Array();
        this.Find( name, v => array.push( v ), findOne );
        return array;
    }

    private FindNumbers( name: string, findOne: boolean ): Array< number >
    {
        let array: Array< number > = Array();
        this.Find( name, v => array.push( Number( v ) ), findOne );
        return array;
    }

    private FindBoolean( name: string ): boolean
    {
        let foundValue: boolean = false;
        this.Find( name, v => foundValue = true, true );
        return foundValue;
    }
    
    private Find( name: string, action: ( v: string ) => void, findOne: boolean ): void
    {
        let foundValue = false;
        for ( let i = 0; i < this.m_argv.length; i ++ )
        {
            let a = this.m_argv[ i ];
            if ( a.startsWith( "--" ) && a == "--" + name )
            {
                if ( (i+1) < this.m_argv.length )
                {
                    action( null );
                }
                else
                {
                    let b = this.m_argv[ i + 1 ];
                    if ( b.startsWith( "--" ) )
                    {
                        action( null );
                    }
                    else
                    {
                        action( b );
                    }
                }
                foundValue = true;
            }

            if ( findOne == true && foundValue == true )
                break;
        }
    }
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