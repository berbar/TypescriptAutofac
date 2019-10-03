
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

declare interface ArrayConstructor
{
    convertAll< TInput, TOutput >( array: Array< TInput >, converter: ( input: TInput ) => TOutput ): Array< TOutput >;
}

