


namespace iberbar.System
{
    export class TCallback< T extends (...args: any) => any >
    {
        // handler: any;
        // process: T;

        private readonly m_executable: T;

        public constructor( process?: T, handler?: any )
        {
            // this.process = process;
            // this.handler = handler;
            this.m_executable = process.bind( handler );
        }

        // public get Execute(): T
        // {
        //     return this.m_executable;
        // }

        public Execute( ...args: Parameters<T> ): ReturnType<T>
        {
            return this.m_executable( ...<any[]>args );
        }
    };

    export type TCallbackOrFunction< T extends (...args: any) => any > = T | TCallback< T > ;


    export class TCallbackArray< T extends (...args: any) => any >
    {
        public callbacks: TCallback< T >[] = [];

        public Add( callback: TCallbackOrFunction< T > | Array< TCallbackOrFunction< T > > )
        {
            if ( callback instanceof Array )
            {
                for ( let i = 0; i < callback.length; i ++ )
                {
                    let cb = callback[ i ];
                    if ( typeof( cb ) == "function" )
                        this.callbacks.push( new TCallback( cb ) );
                    else
                        this.callbacks.push( cb );
                }

            }
            else
            {
                if ( typeof( callback ) == "function" )
                    this.callbacks.push( new TCallback( callback ) );
                else
                    this.callbacks.push( callback );
            }
        }

        public Execute( ...args: Parameters<T> ): void
        {
            if ( this.callbacks != null && this.callbacks.length > 0 )
            {
                for ( let i = 0; i < this.callbacks.length; i ++ )
                {
                    let cb = this.callbacks[ i ];
                    if ( cb == null )
                        continue;
                    cb.Execute( ...args );
                }
            }
        }

        public Copy(): TCallbackArray< T >
        {
            let copycat = new TCallbackArray< T >();
            for ( let i = 0; i < this.callbacks.length; i ++ )
            {
                let cb = this.callbacks[ i ];
                copycat.callbacks.push( cb );
            }
            return copycat;
        }
    };



}

interface Object
{
    /**
     * **⇩ 拓展方法**
     * 
     * 构建回调函数对象
     * @param method 方法 
     */
    __Callback< T extends ( ...args: any[] ) => any >( method: T ): iberbar.System.TCallback< T >;
}

Object.prototype.__Callback = function< T extends ( ...args: any[] ) => any >( method: T ): iberbar.System.TCallback< T >
{
    return new iberbar.System.TCallback( method, this );
}

Reflect.defineProperty( Object.prototype, "__Callback", { enumerable: false } );