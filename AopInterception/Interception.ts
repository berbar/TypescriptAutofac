


namespace Interception
{
    @System.AttributeUsage( System.UAttributeTarget.Method, true, false )
    export class CInterceptionAttribute extends System.CAttribute
    {
        protected m_handlerType: System.Reflection.CType< IInterceptionHandler > = null;

        public constructor( handlerType: System.Reflection.CType< IInterceptionHandler > )
        {
            super();
            this.m_handlerType = handlerType;
        }

        public get HandlerType()
        {
            return this.m_handlerType;
        }
    }

    export interface IHandlerContext
    {
        GetParameters(): any[];
    }

    class CHandlerContext implements IHandlerContext
    {
        protected m_parameters: any[] = null;

        public SetParameters( ps: any[] ): void
        {
            this.m_parameters = ps;
        }

        public GetParameters()
        {
            if ( this.m_parameters == null )
                return null;
            return Object.assign( [], this.m_parameters );
        }
    }

    export interface IInterceptionHandler
    {
        // ExecuteBefore(): void;
        // ExecuteAfter(): void;
        
        Execute( context: IHandlerContext ): void;
    }

    export type UHandlerNextDelegate = ( context: IHandlerContext ) => void;

    export function Interception( handlerType: System.Reflection.CType< IInterceptionHandler > ) : System.UDecoratorFunctionType_ForMethod
    {
        return System.AttributeDecorate( new CInterceptionAttribute( handlerType ) );
    }


    export function InitializeInterceptionsOnType( targetType: System.Reflection.CType )
    {
        let methodInfos = targetType.GetMethods();
        for ( const mi of methodInfos )
        {
            let attrInterceptions = mi.GetCustomAttributes( System.Reflection.TypeOf( CInterceptionAttribute ) );
            if ( attrInterceptions == null || attrInterceptions.length == 0 )
                continue;
            let descriptor = mi.Descriptor;
            let oldMethod = descriptor.value;
            let newMethod = function( this: any, ...args: any[] )
            {
                let handlers: IInterceptionHandler[] = [];
                // for ( let i = 0; i < attrInterceptions.length; i ++ )
                // {
                //     let handlerType = attrInterceptions[ i ].HandlerType;
                //     let handlerConstructor = handlerType.GetConstructor();
                //     handlers[ i ] = <IInterceptionHandler>handlerConstructor.Invoke();
                //     //handlers[ i ].ExecuteBefore();
                // }

                let handlerContext = new CHandlerContext();
                handlerContext.SetParameters( args );
                for ( let i = attrInterceptions.length - 1; i >= 0; i -- )
                {
                    let nextHandler: IInterceptionHandler = null;
                    if ( i < ( handlers.length - 1 ) )
                    {
                        nextHandler = handlers[ i + 1 ];
                    }
                    let next: Function = null;
                    if ( nextHandler == null )
                    {
                        next = function( this: any, handlerContext: IHandlerContext )
                        {
                            oldMethod.apply( this, handlerContext.GetParameters() );
                        }.bind( this );
                    }
                    else
                    {
                        next = nextHandler.Execute.bind( nextHandler );
                    }
                    let handlerType = attrInterceptions[ i ].HandlerType;
                    let handlerConstructor = handlerType.GetConstructor();
                    handlers[ i ] = <IInterceptionHandler>handlerConstructor.Invoke( next );
                }
                handlers[ 0 ].Execute( handlerContext );
                // for ( let i = 0; i < attrInterceptions.length; i ++ )
                // {
                    
                // }
                // oldMethod.apply( this, args );
                // for ( let i = attrInterceptions.length - 1; i >= 0; i -- )
                // {
                //     handlers[ i ].ExecuteAfter();
                // }
            };
            (<any>newMethod).originMethod = oldMethod;
            // Reflect.defineProperty( newMethod, System.uSymbolForAttributesContainer, {
            //     set: function( value: any ): void
            //     {
            //         (<any>this).originMethod[ System.uSymbolForAttributesContainer ] = value;
            //     },
            //     get: function( this: Function ): any
            //     {
            //         return (<any>this).originMethod[ System.uSymbolForAttributesContainer ];
            //     }
            // });
            descriptor.value = newMethod;
            descriptor.writable = false;
            Reflect.defineProperty( mi.GetJsPrototype(), mi.Name, descriptor );
        }
    }
}