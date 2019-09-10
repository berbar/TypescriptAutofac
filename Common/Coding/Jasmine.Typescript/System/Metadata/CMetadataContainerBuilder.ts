

namespace System.Metadata
{
    export class CMetadataContainerBuilder
    {
        private readonly m_configurationCallbacks: Builder.CDeferredCallback[] = [];

        public AddAttribute( type: Reflection.CType, target: UAttributeTarget, attribute: CAttribute ): void
        {
            this.AddCallback( registry =>
            {

            });
        }

        public Build(): IMetadataContainer
        {
            return null;
        }

        public AddCallback( callback: ( registry: Core.IMetadataRegistry ) => void ): void
        {
            let c = new Builder.CDeferredCallback( callback );
            this.m_configurationCallbacks.push( c );
        }
    }
}