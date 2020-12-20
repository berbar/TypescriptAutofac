

namespace iberbar.System.Metadata.Core
{
    export class CMetadataCollection implements IMetadataCollection
    {
        private readonly m_list: CAttribute[] = [];

        public constructor()
        {
        }

        AddAttribute( attribute: CAttribute ): void
        {
            this.m_list.splice( 0, 0, attribute );
        }


        GetAttributeOne<T extends CAttribute>( type: Reflection.CType ): T
        {
            for ( let i = 0; i < this.m_list.length; i ++ )
            {
                let attribute = this.m_list[ i ];
                if ( attribute.GetType().IsEquivalentTo( type ) )
                    return <T>attribute;
            }
            return null;
        }

        GetAttributes<T extends CAttribute>( type: Reflection.CType<T> ): T[]
        {
            let attributeList: T[] = [];
            for ( let i = 0; i < this.m_list.length; i ++ )
            {
                let attribute = this.m_list[ i ];
                if ( attribute.GetType().IsEquivalentTo( type ) )
                    attributeList.push( <T>attribute );
            }
            return attributeList;
        }
        
        GetAttributesAll(): CAttribute[] {
            throw new Error("Method not implemented.");
        }


    }
}