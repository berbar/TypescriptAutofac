
/// <reference types="@aspnet/signalr" />

namespace Network.Socket.SignalR
{
    export class CSignalRConnection extends CConnection
    {

        protected readonly m_settings: UConnectionSettings = null;
        protected m_connectState: UConnectState = UConnectState.None;
        protected m_connection: signalR.HubConnection = null;

        public constructor( settings: UConnectionSettings )
        {
            super();
            this.m_settings = settings;
            this.m_connection = new signalR.HubConnectionBuilder()
                .withUrl( this.m_settings.url, {
                    //skipNegotiation: true,
                    transport: signalR.HttpTransportType.WebSockets
                  } )
                .configureLogging( signalR.LogLevel.Debug )
                .build();
        }

        public async Connect(): Promise<void>
        {
            let thisConn = this;
            return this.m_connection.start().then( function ()
            {
                thisConn.m_connectState = UConnectState.Connected;
            }).catch( function()
            {
                thisConn.m_connectState = UConnectState.OccurredError;
            }).finally( function()
            {
            });
        }

        Reconnect(): void
        {
        }

        public Send( methodName: string, ...args: any[] ): Promise< any >
        {
            return this.m_connection.invoke( methodName, ...args );
        }

        public async SendSync( methodName: string, ...args: any[] ): Promise<any>
        {
            await this.m_connection.invoke( methodName, ...args );
        }

        Invoke(): void
        {
            throw new Error("Method not implemented.");
        }

        public Listen( methodName: string, listener: ( ...args: any [] ) => void | System.TCallback< ( ...args: any [] ) => void > ): void
        {
            if ( typeof( listener ) == "function" )
            {
                this.m_connection.on( methodName, listener )
            }
            else
            {
                this.m_connection.on( methodName, function( ...args: any[] )
                {
                    (<System.TCallback< ( ...args: any [] ) => void >>listener).Execute( ...args );
                });
            }
        }

        public get Settings(): UConnectionSettings
        {
            return this.m_settings;
        }
    }
}