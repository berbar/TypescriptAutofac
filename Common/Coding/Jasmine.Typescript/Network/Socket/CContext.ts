

namespace Network.Socket
{
    export abstract class CContext implements CBaseContext
    {
        private readonly m_connection: CConnection = null;

        private readonly m_listeners: System.Collections.Generic.IDictionary< string, Array< Core.IReceiverResolveOperation > >;

        public constructor( connection: CConnection )
        {
            this.m_connection = connection;
            this.m_listeners = new System.Collections.Generic.CDictionary( {} );
        }

        public get Connection(): CConnection
        {
            return this.m_connection;
        }

        private BatchListen(): void
        {
            this.m_listeners.Each( this.__Callback( function( this: CBaseContext, k, v )
            {

            } ) );
        }

        private ResolveReceivers(): void
        {
            
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

                    let collection = this.m_listeners.Get( attrReceiveMethod.Name );
                    if ( collection == null )
                        this.m_listeners.Add( attrReceiveMethod.Name, collection = [] );
                    collection.push( new Core.CReceiverResolveOperation( type, methodName, methodInfo ) );
                }
            }
            else
            {
                let methodInfo = type.GetMethodOne( "OnReceived" )
                if ( methodInfo == null )
                    return;

                if ( attrReceiveMethod.Name == null )
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
                this.m_connection.Listen( k, function( ...args: any[] )
                {

                })
            } ) );
        }
    }
}