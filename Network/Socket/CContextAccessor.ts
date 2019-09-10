

namespace Network.Socket
{
    export class CContextAccessor
    {
        private readonly m_contexts: System.Collections.Generic.IDictionary<string, CBaseContext> = new System.Collections.Generic.CDictionary();

        public AddSocketContext( context: CBaseContext ): void
        {
            this.m_contexts.Add( context.Connection.Settings.url, context );
        }

        public GetSocketContext( key: UConnectionSettings | string ): CBaseContext
        {
            if ( typeof( key ) == "string" )
            {
                return this.m_contexts.Get( key );
            }
            return this.m_contexts.Get( key.url );
        }
    }
}