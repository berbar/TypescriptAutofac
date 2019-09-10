

namespace Mvc
{
    export namespace Attributes
    {
        @System.AttributeUsage( System.UAttributeTarget.Class, true, false )
        export class DependOnViewAttribute extends System.CAttribute
        {
            protected m_selectorText: string = null;
            protected m_fromBody: boolean = false;
            protected m_createMethod: CView.UCreateMethod = CView.UCreateMethod.Append;
            protected m_viewType: System.Reflection.CType< CView > = null;
    
            public constructor( viewType: System.Reflection.CType< CView >, selectorText: string )
            {
                super();
                this.m_selectorText = selectorText;
                this.m_viewType = viewType;
            }

            public get ViewType()
            {
                return this.m_viewType;
            }
    
            public get SelectorText()
            {
                return this.m_selectorText;
            }

            public set FromBody( value: boolean )
            {
                this.m_fromBody = value;
            }
            public get FromBody(): boolean
            {
                return this.m_fromBody;
            }
    
            public set CreateMethod( value: CView.UCreateMethod )
            {
                this.m_createMethod = value;
            }

            public get CreateMethod(): CView.UCreateMethod
            {
                return this.m_createMethod;
            }
        };
    }

    export function DependOnView( viewType: System.Reflection.CType< CView >, selectorText: string, options?: { fromBody?: boolean, createMethod?: CView.UCreateMethod } ): System.UDecoratorFunctionType_ForClass
    {
        if ( viewType == null )
        {
            throw new Error( "viewType must be valid." );
        }
        // if ( selectorText == null )
        // {
        //     throw new Error( "selectorText must be valid." );
        // }
        let attribute = new Attributes.DependOnViewAttribute( viewType, selectorText );
        if ( options != null )
        {
            if ( options.fromBody != null )
            {
                attribute.FromBody = options.fromBody;
            }
            if ( options.createMethod != null )
            {
                attribute.CreateMethod = options.createMethod;
            }
        }
        return System.AttributeDecorate( attribute );
    }
}