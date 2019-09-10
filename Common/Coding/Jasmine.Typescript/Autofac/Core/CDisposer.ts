

namespace Ioc.Core
{
    export class CDisposer implements IDisposer
    {
        private m_items: System.IDisposable[] = [];

        AddInstanceForDisposal(instance: System.IDisposable): void {
            this.m_items.push( instance );
        }
        
        Dispose(): void
        {
            for ( const item of this.m_items )
            {
                item.Dispose();
            }
            this.m_items = null;
        }
    }
}