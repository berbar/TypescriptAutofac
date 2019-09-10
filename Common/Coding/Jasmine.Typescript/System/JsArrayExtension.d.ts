
declare interface Array<T>
{
    firstOrDefault( predicate: ( e: T, index: number ) => boolean ): T;
    where( predicate: ( e: T, index: number ) => boolean ): Array<T>;
}

declare interface ReadonlyArray<T>
{
    firstOrDefault( predicate: ( e: T, index: number ) => boolean ): T;
    where( predicate: ( e: T, index: number ) => boolean ): Array<T>;
}

