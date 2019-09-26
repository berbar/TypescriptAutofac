

namespace iberbar.Network.Socket
{
    export abstract class CContext implements CBaseContext
    {
        private readonly m_connection: CConnection = null;

        private readonly m_listeners: System.Collections.Generic.IDictionary< string, Array< Core.IReceiverResolveOperation > >;

        private readonly m_lifetimeScope: Autofac.ILifetimeScope = null;

        public constructor( connection: CConnection, lifetimeScope: Autofac.ILifetimeScope )
        {
            this.m_connection = connection;
            this.m_lifetimeScope = lifetimeScope;
            this.m_listeners = new System.Collections.Generic.CDictionary( {} );
        }

        public get Connection(): CConnection
        {
            return this.m_connection;
        }

        public AddReceivers( types: ReadonlyArray< System.Reflection.CType > ): void
        {
            for ( const t of types )
            {
                this.AddReceiver( t );
            }
        }

        private AddReceiver( type: System.Reflection.CType ): void
        {
            let typeReceiveMethodAttribute = System.Reflection.TypeOf( Decorators.CReceiveMethodAttribute )
            let attrReceiveMethod = type.GetCustomAttributeOne( typeReceiveMethodAttribute, false );
            if ( attrReceiveMethod == null )
            {
                let methods = type.GetMethods();
                for ( const methodInfo of methods )
                {
                    attrReceiveMethod = methodInfo.GetCustomAttributeOne( typeReceiveMethodAttribute );
                    if ( attrReceiveMethod == null )
                    {
                        continue;
                    }

                    let methodName = attrReceiveMethod.Name;
                    if ( methodName == null )
                    {
                        methodName = methodInfo.Name;
                    }

                    let collection = this.m_listeners.Get( methodName );
                    if ( collection == null )
                        this.m_listeners.Add( methodName, collection = [] );
                    collection.push( new Core.CReceiverResolveOperation( type, methodName, methodInfo ) );
                }
            }
            else
            {
                let methodInfo = type.GetMethodOne( "OnReceived" )
                if ( methodInfo == null )
                    return;

                if ( attrReceiveMethod.Name == null || attrReceiveMethod.Name.length == 0 )
                    return;

                let collection = this.m_listeners.Get( attrReceiveMethod.Name );
                if ( collection == null )
                    this.m_listeners.Add( attrReceiveMethod.Name, collection = [] );
                collection.push( new Core.CReceiverResolveOperation( type, attrReceiveMethod.Name, methodInfo ) );
            }
        }

        public BindReceivers(): void
        {
            this.m_listeners.Each( this.__Callback( function( this: CContext, k, v )
            {
                this.m_connection.Listen( k, this.__Callback( function( this: CContext, ...args: any[] )
                {
                    for ( const resolveOperation of v )
                    {
                        resolveOperation.Resolve( this, this.m_lifetimeScope, args );
                    }
                }) );
            } ) );
        }
    }
}