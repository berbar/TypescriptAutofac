

namespace iberbar.Network.Socket
{
    export abstract class CConnection
    {
        public abstract Send<T extends (...args: any) => any>( methodName: string, ...args: Parameters<T> ): Promise< ReturnType<T> >;

        public abstract async SendSync( methodName: string, ...args: any[] ): Promise<any>;

        public abstract Invoke( method: string, ...args: any[] ): void;

        public abstract async Connect(): Promise<void>;

        public abstract Reconnect(): void;

        public abstract Listen( methodName: string, listener: ( ( ...args: any [] ) => any ) | System.TCallback< ( ...args: any [] ) => any > ): void;

        public abstract get Settings(): UConnectionSettings;
    }
}
