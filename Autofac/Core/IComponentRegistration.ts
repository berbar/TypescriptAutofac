

namespace Ioc.Core
{
    export interface IComponentRegistration extends System.IDisposable
    {
        readonly Activator: IInstanceActivator;

        readonly Lifetime: IComponentLifetime;

        readonly Sharing: UInstanceSharing;

        readonly ID: string;

        readonly Services: ReadonlyArray< CService >;

        readonly Metadta: any;

        readonly Target: IComponentRegistration;

        readonly Preparing: any;

        RaisePreparing( context: IComponentContext, parameters: System.RefParameter< Array< any > > ): void;

        readonly Activating: System.TCallbackArray< ( sender: any, e: Core.IActivatingEventArgs<object> ) => void >;

        RaiseActivating( context: IComponentContext, parameters: ReadonlyArray< CParameter >, instance: object ): object;

        readonly Activated: any;

        RaiseActivated( context: IComponentContext, parameters: ReadonlyArray< CParameter >, instance: object ): void;
    }
}