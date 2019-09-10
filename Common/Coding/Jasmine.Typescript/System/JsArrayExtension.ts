

/// <reference path="./JsArrayExtension.d.ts" />



Array.prototype.firstOrDefault = function<T>( predicate: ( e: T, index: number ) => boolean ): T
{
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

