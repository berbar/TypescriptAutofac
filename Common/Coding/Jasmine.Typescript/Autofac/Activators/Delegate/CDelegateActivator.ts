

namespace Autofac.Activators.Delegate
{
    export type UActivationFunction< T extends object = object > = ( context: IComponentContext, parameters: ReadonlyArray<Core.CParameter> ) => T;

    export class CDelegateActivator extends CInstanceActivator implements Core.IInstanceActivator
    {
        private readonly m_activationFunction: System.TCallback< UActivationFunction >;

        public constructor( implementationType: System.Reflection.CType, activationFunction: System.Delegate< UActivationFunction > )
        {
            super( implementationType );
            if ( typeof( activationFunction ) == "function" )
                this.m_activationFunction = System.__Callback( activationFunction );
            else
                this.m_activationFunction = activationFunction;
        }

        public ActivateInstance(context: IComponentContext, parameters?: Core.CParameter[]): object
        {
            let result = this.m_activationFunction.Execute( context, parameters );
            if ( result == null )
            {
                throw new Error( "...." );
            }
            return result;
        }
    }
}