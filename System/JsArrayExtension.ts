

declare interface Array<T>
{
    firstOrDefault( predicate?: ( e: T, index: number ) => boolean ): T;
    where( predicate: ( e: T, index: number ) => boolean ): Array<T>;
}

declare interface ReadonlyArray<T>
{
    firstOrDefault( predicate?: ( e: T, index: number ) => boolean ): T;
    where( predicate: ( e: T, index: number ) => boolean ): Array<T>;
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

