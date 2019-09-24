


namespace iberbar.Autofac.Core
{
    export type UCallbackActivatingFunction<T> = ( e: Core.IActivatingEventArgs<T> ) => void;
    export type UCallbackActivating<T> = System.TCallback< UCallbackActivatingFunction<T> > | UCallbackActivatingFunction<T>;
}