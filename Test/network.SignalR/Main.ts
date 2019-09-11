
/// <reference path="../dist/JsArrayExtension.d.ts" />


import { System, Autofac } from "../dist/jasmine";

import http = require('http');
import * as TestHub from "./TestHub";
import { CTestHubContext } from "./TestHub/Context";

const socketConnectionSettings: Network.Socket.UConnectionSettings =
{
    url: "http://localhost:63355/TestHub"
};





class CApplication
{
    private m_lifetimeScope: Autofac.ILifetimeScope = null;

    public async Start(): Promise<void>
    {
        this.Preload();

        let contextAccessor = this.m_lifetimeScope.Resolve( System.Reflection.TypeOf( Network.Socket.CContextAccessor ) );
        let socketContext = contextAccessor.GetSocketContext( socketConnectionSettings );
        await socketContext.Connection.Connect();
        socketContext.Connection.Listen( "RoleResult", function()
        {
            console.debug( arguments );
        } );
        socketContext.Connection.Send( "Role", "Admin" );
    }

    private Preload(): void
    {
        let socketConnection = new Network.Socket.SignalR.CSignalRConnection( socketConnectionSettings );
        
        let socketContext = new Network.Socket.CContext( socketConnection );
        let socketContextAccessor = new Network.Socket.CContextAccessor();
        socketContextAccessor.AddSocketContext( socketContext );
        
        let cb = new Autofac.CContainerBuilder();
        cb.RegisterInstance( System.Reflection.TypeOf( Network.Socket.CContextAccessor ), socketContextAccessor );
        cb.Register( System.Reflection.TypeOf( CTestHubContext ), ( lifetimeScope, parameters ) => {
            let socketContext = new CTestHubContext( new Network.Socket.SignalR.CSignalRConnection( socketConnectionSettings ) );
            //lifetimeScope.ResolveComponent( lifetimeScope.ComponentRegistry.GetRegistration( System.Reflection.TypeOf( Network.Socket.CContextAccessor ) ), null );
        } ).AsSelf();

        // TestHub接收器的类型
        let receiverTypes = new System.Reflection.CAssembly( TestHub ).GetTypes().where( t => {
            if ( t.IsInheritFrom( System.Reflection.TypeOf( Network.Socket.CReceiver ) ) )
                return true;
            if ( t.GetMethodOne( "OnReceived" ) != null )
                return true;
            return false;
        } );
        cb.RegisterTypes( receiverTypes )
            .AsSelf()
            .InstancePerDependency();
        socketContext.AddReceivers( receiverTypes );
            
        
        this.m_lifetimeScope = cb.Build();
    }
}

new CApplication().Start();




var server = http.createServer(function (req, res) {
});
server.listen(9000);
