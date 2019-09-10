
import Jasmine from "../dist/jasmine";

const TypeOf = System.Reflection.TypeOf;

console.debug( Jasmine );


@Network.Lived.Decorators.ReceiveMethod( "Login" )
class CReceiveMethod_Login implements Network.Lived.IReceiveMethod
{
    public OnReceived(...args: any[]) {
    }
}

class CReceiverChat implements Network.Lived.IReceiver
{
    @Network.Lived.Decorators.ReceiveMethod( "GetMessage" )
    public GetMessage(): void
    {

    }

    @Network.Lived.Decorators.ReceiveMethod( "GetImage" )
    public GetImage(): void
    {

    }
}

class CWebsocketContext extends Network.Lived.CContext
{
    public constructor()
    {
        super();
    }
}

let cb = new Ioc.CContainerBuilder();
cb.RegisterType( TypeOf( Network.Lived.SignalR.CSignalRConnection ) ).As( TypeOf( Network.Lived.CConnection ) ).InstancePerDependency();
cb.RegisterType( TypeOf( CWebsocketContext ) ).Keyed( TypeOf( Network.Lived.CContext ), "/TestHub" ).SingleInstance();

let netContext = new Network.Lived.CContext();
netContext.AddReceiver( System.Reflection.TypeOf( CReceiveMethod_Login ) );
netContext.AddReceiver( System.Reflection.TypeOf( CReceiverChat ) );