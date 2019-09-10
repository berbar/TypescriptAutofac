

import Jasmine from "../../dist/jasmine";


const TypeOf = System.Reflection.TypeOf;


var testID = 0;

namespace Assembly1
{
    export class CTestingBase
    {
        private readonly testID = ++testID;
        Ha()
        {
        }
    }
    export namespace Assembly2
    {
        export class Testing2 extends CTestingBase
        {
        }

        export namespace Testing2
        {
            class Testing3
            {

            }
            console.debug( Testing3 );
        }
    }

    export class Testing extends CTestingBase
    {

    }
}

class CAni
{
    private readonly testID = ++testID;
    private readonly name: string = "";
    public constructor( name?: string )
    {
        this.name = name;
    }
}

class CSingle
{
    private readonly testID = ++testID;
}

abstract class  CTest implements System.IDisposable
{
    Dispose(): void {
        console.debug( "dispose %s", this.testID );
    }
    private readonly m_ani: CAni = null;
    private readonly testID = ++testID;

    public constructor( ani: CAni )
    {
        this.m_ani = ani;
    }
}

class CTest1 extends CTest
{
    public constructor(
        @System.Reflection.DeclaringType( TypeOf( CAni ) )
        ani: CAni
    )
    {
        super( ani );
    }
}

class CTest2 extends CTest
{
    private m_ani2: CAni = null;

    public constructor(
        @System.Reflection.DeclaringType( TypeOf( CAni ) )
        @System.Reflection.Named( "ani" )
        ani: CAni,

        @Autofac.InjectLifetimeScope()
        lifetimeScope: Autofac.ILifetimeScope
    )
    {
        super( ani );
        console.debug( lifetimeScope );
    }

    public set Name( str: string )
    {

    }

    public get Name(): string
    {
        return "";
    }

    @System.Reflection.DeclaringType( TypeOf( CAni ) )
    public set Ani( ani: CAni )
    {
        this.m_ani2 = ani;
    }
}

let ss = Symbol("ss");
console.debug( TypeOf( CTest1 ) );

interface ii
{
    Haha<T>( s: keyof T ): any;
    Bye(): void;
}
// type s = keyof ii;
// console.debug( s );



let cb = new Autofac.CContainerBuilder();
cb.RegisterType( TypeOf( CTest1 ) )
    .AsSelf().As( TypeOf( CTest ) )
    .Keyed( TypeOf( CTest ), "1" )
    .InstancePerMatchingLifetimeScope( ss )
    .WithParameter( new Autofac.CTypedParameter( TypeOf( CAni ), new CAni( "sss" ) ));
cb.RegisterType( TypeOf( CTest2 ) )
    .AsSelf()
    .As( TypeOf( CTest ) )
    .Keyed( TypeOf( CTest ), "2" )
    .InstancePerMatchingLifetimeScope( ss )
    .PropertiesAutowired()
    .WithProperty( new Autofac.CTypedParameter( TypeOf( CAni ), new CAni( "with property" ) ) );

//cb.RegisterType( TypeOf( CAni ) ).AsSelf().InstancePerLifetimeScope();
//cb.RegisterAssemblyTypes( new System.Reflection.CAssembly( Assembly1 ) ).Where( ( t ) => t.IsEquivalentTo( Assembly1.Testing ) ).AsSelf().SingleInstance();

cb.RegisterTypes( [ TypeOf( Assembly1.Testing ), TypeOf( Assembly1.Assembly2.Testing2 ) ] )
    .AsSelf()
    .KeyedMapping( TypeOf( Assembly1.CTestingBase ), t => t.GetJsConstructor().name )
    .SingleInstance();

cb.RegisterInstance( TypeOf( CSingle ), new CSingle() );

let container = cb.Build();
console.debug( container );

let test: CTest;
let single: CSingle;

// test = container.Resolve( TypeOf( CTest ) );
// console.debug( test );

// test = container.Resolve( TypeOf( CTest ) );
// console.debug( test );

single = container.Resolve( TypeOf( CSingle ) );
console.debug( single );



let scope1 = container.BeginLifetimeScope( ss );

try
{
    console.debug( scope1 );
    //test = scope1.ResolveKeyed( TypeOf( CTest ), "1", new Autofac.CTypedParameter( TypeOf( CAni ), new CAni( "bee" ) ) );
    test = scope1.ResolveKeyed( TypeOf( CTest ), "1" );
    console.debug( test );
    
    test = scope1.ResolveKeyed( TypeOf( CTest ), "1", new Autofac.CTypedParameter( TypeOf( CAni ), new CAni() ) );
    console.debug( test );
    
    test = scope1.ResolveKeyed( TypeOf( CTest ), "2", new Autofac.CTypedParameter( TypeOf( CAni ), new CAni() ) );
    console.debug( test );
    
    test = scope1.ResolveKeyed( TypeOf( CTest ), "2", new Autofac.CTypedParameter( TypeOf( CAni ), new CAni( "gee" ) ) );
    console.debug( test );
    
    
    
    single = scope1.Resolve( TypeOf( CSingle ) );
    console.debug( single );
    
    console.debug( scope1.Resolve( TypeOf( Assembly1.Testing ) ) );
    console.debug( scope1.Resolve( TypeOf( Assembly1.Assembly2.Testing2 ) ) );
    console.debug( scope1.ResolveKeyed( TypeOf( Assembly1.CTestingBase ), "Testing" ) );
    console.debug( scope1.ResolveKeyed( TypeOf( Assembly1.CTestingBase ), "Testing2" ) );
    //console.debug( scope1.Resolve( TypeOf( Assembly1.Assembly2.Testing2.Testing3 ) ) );
}
catch ( e )
{

}

scope1.Dispose();






function ScanTypesFromObject( obj: any ): System.Reflection.CType[]
{
    let types: System.Reflection.CType[] = [];
    for ( const k in obj )
    {
        const v = obj[ k ];
        if ( v == undefined || v == null )
            continue;
        if ( v[ "prototype" ] != null )
        {
            types.push( System.Reflection.TypeOf( v ) );
            types = types.concat( ScanTypesFromObject( v ) );
            continue;
        }
        types = types.concat( ScanTypesFromObject( v ) );
    }
    return types;
}

let types = ScanTypesFromObject( Assembly1 );
console.debug( types );




