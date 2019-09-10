
namespace Ioc.Core
{
    export interface IActivatingEventArgs< T >
    {
        /**
         * Gets the context in which the activation occurred.
         */
        readonly Context: IComponentContext;

        /**
         * Gets the component providing the instance.
         */
        readonly Registration: IComponentRegistration;

        /**
         * Gets the instance that will be used to satisfy the request.
         */
        readonly Instance: T;

        /**
         * The instance can be replaced if needed, e.g. by an interface proxy.
         * @param instance The object to use instead of the activated instance.
         */
        ReplaceInstance( instance: object ): void;

        /**
         * Gets the parameters supplied to the activator.
         */
        readonly Parameters: ReadonlyArray< CParameter >;
    }
}