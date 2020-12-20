

namespace iberbar.Autofac.Core
{
    export class CDisposer implements IDisposer
    {
        private m_items: System.IDisposable[] = [];

        AddInstanceForDisposal(instance: System.IDisposable): void {
            this.m_items.push( instance );
        }
        
        Dispose(): void
        {
            for ( let i = 0; i < this.m_items.length; i ++ )
            {
                let item = this.m_items[ i ];
                item.Dispose();
            }
            this.m_items = null;
        }
    }
}