

namespace Network.Socket
{
    export abstract class CBaseContext
    {
        readonly Connection: CConnection;

        public abstract AddReceivers( types: ReadonlyArray< System.Reflection.CType > ): void;

        public abstract BindReceivers(): void;
    }
}