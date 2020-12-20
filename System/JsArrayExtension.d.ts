
declare interface Array<T>
{
    FirstOrDefault( predicate?: ( e: T, index: number ) => boolean ): T;
    Where( predicate: ( e: T, index: number ) => boolean ): Array<T>;
    RemoveAt( index: number ): Array<T>;
    Remove<T>( element: T ): Array<T>;
    RemoveWhere<T>( predicate: ( e: T, index: number ) => boolean ): Array<T>;
}

declare interface ReadonlyArray<T>
{
    FirstOrDefault( predicate?: ( e: T, index: number ) => boolean ): T;
    Where( predicate: ( e: T, index: number ) => boolean ): Array<T>;
}

declare interface ArrayConstructor
{
    convertAll< TInput, TOutput >( array: Array< TInput >, converter: ( input: TInput ) => TOutput ): Array< TOutput >;
}

