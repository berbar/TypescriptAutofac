

import Jasmine from "../../dist/jasmine";

export class CTestReceiver implements Network.Socket.IReceiveMethod
{
    OnReceived( text: string )
    {
        console.debug( text );
    }
}
