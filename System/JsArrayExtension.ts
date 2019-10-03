

declare interface Array<T>
{
    firstOrDefault( predicate?: ( e: T, index: number ) => boolean ): T;
    where( predicate: ( e: T, index: number ) => boolean ): Array<T>;
    RemoveAt( index: number ): Array<T>;
    Remove<T>( element: T ): Array<T>;
    RemoveWhere<T>( predicate: ( e: T, index: number ) => boolean ): Array<T>;
}

declare interface ReadonlyArray<T>
{
    firstOrDefault( predicate?: ( e: T, index: number ) => boolean ): T;
    where( predicate: ( e: T, index: number ) => boolean ): Array<T>;
}

interface ArrayConstructor
{
    convertAll< TInput, TOutput >( array: Array< TInput >, converter: ( input: TInput ) => TOutput ): Array< TOutput >;
}

Array.prototype.firstOrDefault = function<T>( predicate?: ( e: T, index: number ) => boolean ): T
{
    if ( predicate == null )
    {
        if ( this.length == 0 )
            return null;
        return this[ 0 ];
    }
    for ( let i = 0; i < this.length; i ++ )
    {
        if ( predicate( this[ i ], i ) )
            return this[ i ];
    }
    return null;
}

Array.prototype.where = function<T>( predicate: ( e: T, index: number ) => boolean ): Array<T>
{
    let temp = [];
    for ( let i = 0; i < this.length; i ++ )
    {
        if ( predicate( this[ i ], i ) )
            temp.push( this[ i ] );
    }
    return temp;
}

Array.prototype.RemoveAt = function( this: Array<any>, index: number ): Array<any>
{
    return this.splice( index, 1 );
}

Array.prototype.Remove = function<T>( this: Array<T>, element: T ): Array<T>
{
    return this.where( e => e != element );
}

Array.prototype.RemoveWhere = function<T>( this: Array<T>, predicate: ( e: T, index: number ) => boolean ): Array< T >
{
    let temp = [];
    for ( let i = 0; i < this.length; i ++ )
    {
        if ( predicate( this[ i ], i ) == false )
            temp.push( this[ i ] );
    }
    return temp;
}

Array.convertAll = function< TInput, TOutput >( array: Array< TInput >, converter: ( input: TInput ) => TOutput ): Array< TOutput >
{
    let arrayOutput: Array< TOutput > = Array();
    for ( const a of array )
    {
        arrayOutput.push( converter( a ) );
    }
    return arrayOutput;
}

