

namespace System.Reflection
{
    export class CAssembly
    {
        private readonly m_jsmodule: any = null;

        public constructor( s: any )
        {
            this.m_jsmodule = s;
        }

        public GetTypes(): CType[]
        {
            return this.GetTypesInternal( this.m_jsmodule );
        }

        private GetTypesInternal( obj: any ): CType[]
        {
            let types: CType[] = [];
            for ( const k in obj )
            {
                const v = obj[ k ];
                if ( v == undefined || v == null )
                    continue;
                if ( v[ "prototype" ] != null )
                {
                    types.push( System.Reflection.TypeOf( v ) );
                    types = types.concat( this.GetTypesInternal( v ) );
                    continue;
                }
                types = types.concat( this.GetTypesInternal( v ) );
            }
            return types;
        }
    }
}
