
namespace Ioc.Builder
{
    export class CSingleRegistrationStyle
    {
        private readonly m_id: string = Core.GenID();

        private m_preserveDefaults: boolean = false;

        public get ID(): string
        {
            return this.m_id;
        }

        public set PreserveDefaults( value: boolean )
        {
            this.m_preserveDefaults = value;
        }

        public get PreserveDefaults(): boolean
        {
            return this.m_preserveDefaults;
        }
    }
}
