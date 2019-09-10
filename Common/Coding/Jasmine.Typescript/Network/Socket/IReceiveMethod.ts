
/// <reference path="./Decorators/ReceiveMethodAttribute.ts" />


namespace Network.Socket
{
    /**
     * 一个类只接受并处理一种消息
     */
    export interface IReceiveMethod
    {
        OnReceived( ...args: any[] ): any;
    }

    /**
     * Example
     */
    @Decorators.ReceiveMethod( "Test" )
    export class CReceiveTest implements IReceiveMethod
    {
        OnReceived(...args: any[])
        {
            console.debug( args );
        }
    }
}
