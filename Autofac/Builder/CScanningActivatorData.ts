
namespace Ioc.Builder
{
    export class CScanningActivatorData extends CReflectionActivatorData implements IActivatorData
    {
        private readonly m_filter: (( type: System.Reflection.CType ) => boolean)[] = [];

        private readonly m_configurationActions: ( (type: System.Reflection.CType, rb: IRegistrationBuilder) => void )[] = [];

        public constructor()
        {
            super( System.Reflection.TypeOf( Object ) );
        }

        GetTypes(): ( t: System.Reflection.CType ) => System.Reflection.CType
        {
            throw new Error("Method not implemented.");
        }

        GetActivator(): Core.IInstanceActivator
        {
            throw new Error("Method not implemented.");
        }

        public get Filters()
        {
            return this.m_filter;
        }

        public get ConfigurationActions()
        {
            return this.m_configurationActions;
        }
    }
}