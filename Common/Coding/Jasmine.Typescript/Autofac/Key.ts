

namespace Autofac
{
    export interface IKey
    {
        Equals( key: IKey ): boolean;
    }

    export class CStringKey implements IKey
    {
        private readonly m_str: string = null;

        public constructor( str: string )
        {
            this.m_str = str;
        }

        Equals(key: IKey): boolean
        {
            throw new Error("Method not implemented.");
        }

    }
    // export class CIndex< TKey extends IKey, TService extends object > extends System.CFunction< ( key: TKey ) => TService >
    // {
    // };
}
