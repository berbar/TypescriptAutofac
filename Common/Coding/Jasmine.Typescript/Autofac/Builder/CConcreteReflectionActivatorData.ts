
/// <reference path="./CReflectionActivatorData.ts" />


namespace Ioc.Builder
{
    /**
     * Reflection activator data for concrete types.
     */
    export class CConcreteReflectionActivatorData extends CReflectionActivatorData implements IConcreteActivatorData, IActivatorData
    {

        //private readonly m_activator: Core.IInstanceActivator = null;

        public constructor( implementer: System.Reflection.CType )
        {
            super( implementer );
        }

        GetTypes(): ( t: System.Reflection.CType ) => System.Reflection.CType 
        {
            return () => this.ImplementationType;
        }

        GetActivator(): Core.IInstanceActivator
        {
            return new Activators.Reflection.CReflectionActivator(
                this.ImplementationType,
                this.ConfiguredParameters,
                this.ConfiguredProperties );
        }

        Dispose(): void
        {
            throw new Error("Method not implemented.");
        }
    }
}