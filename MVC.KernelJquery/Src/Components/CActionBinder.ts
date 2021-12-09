


namespace iberbar.MVC.KernelJquery.Components
{
    export class CActionBinder implements Core.CActionBinder
    {
        public BindActions( view: CView, handlerType: System.Reflection.CType ): Core.IActionBinderResult
        {
            let result = new CActionBinderResult();
            this.ReBindActionsForType( view, handlerType );
            return result;
        }

        protected ReBindActionsForType( view: CView, type: System.Reflection.CType ): void
        {
            let methodInfos = ( type == null ) ? view.GetType().GetMethods() : type.GetMethods();
            let binder = this;
            for ( let i = 0; i < methodInfos.length; i ++ )
            {
                let mi = methodInfos[ i ];
                let actionAttrList = mi.GetCustomAttributes( System.Reflection.TypeOf( Attributes.CSetActionAttribute ) );
                if ( actionAttrList == null || actionAttrList.length == 0 )
                    continue;
                for ( let j = 0; j < actionAttrList.length; j ++ )
                {
                    let actionAttr = actionAttrList[ j ];
                    let event = actionAttr.Event;
                    let selectorText = actionAttr.SelectorText;
                    let elementTemp: JQuery = null;
                    if ( actionAttr.FromBody == true )
                    {
                        if ( selectorText == null )
                            elementTemp = $( "body" );
                        else
                            elementTemp = $( selectorText );
                    }
                    else
                    {
                        if ( selectorText == null )
                            elementTemp = view.GetElementRoot();
                        else
                            elementTemp = view.GetElementRoot().find( selectorText );
                    }
                    if ( elementTemp == null || elementTemp.length == 0 )
                        continue;
                    
                    if ( event == "click" )
                    {
                        elementTemp.click( function( e )
                        {
                            return binder.InvokeControllerMethod( view, type, $( this ), e, mi );
                        });
                    }
                    else if ( event == "valuechange" )
                    {
                        elementTemp.change( function( e )
                        {
                            return binder.InvokeControllerMethod( view, type, $( this ), e, mi );
                        });
                    }
                    else
                    {
                        elementTemp.on( event, function( e )
                        {
                            return binder.InvokeControllerMethod( view, type, $( this ), e, mi );
                        } );
                    }
                }
            }
        }

        protected InvokeControllerMethod( view: CView, type: System.Reflection.CType, elementEvent: JQuery, jqEvent: JQuery.Event, methodInfo: System.Reflection.CMethodInfo ): boolean
        {
            let provider = view.LifetimeScope;
            let caller = ( type == null ) ? view : provider.Resolve( type );
            let parameterInfos = methodInfo.GetParameters();
            let parameters = Array( parameterInfos.length );
            for ( let parameterIndex = 0; parameterIndex < parameterInfos.length; parameterIndex ++ )
            {
                let pi = parameterInfos[ parameterIndex ];

                if ( pi.IsDefined( System.Reflection.TypeOf( Attributes.CTriggerElementAttribute ) ) )
                {
                    parameters[ parameterIndex ] = elementEvent;
                    continue;
                }

                if ( pi.IsDefined( System.Reflection.TypeOf( Attributes.CTriggerEventAttribute ) ) )
                {
                    parameters[ parameterIndex ] = jqEvent;
                    continue;
                }

                if ( pi.IsDefined( System.Reflection.TypeOf( Attributes.CTriggerViewAttribute ) ) )
                {
                    parameters[ parameterIndex ] = view;
                    continue;
                }

                if ( pi.IsDefined( System.Reflection.TypeOf( Autofac.CInjectLifetimeScopeAttribute ) ) )
                {
                    parameters[ parameterIndex ] = provider;
                    continue;
                }

                //let attrDeclaringType = pi.GetCustomAttributeOne( System.Reflection.TypeOf( System.Reflection.CDeclaringTypeAttribute ) );
                let parameterType = pi.ParameterType;
                let parameterName = pi.Name;
                if ( parameterType != null )
                {
                    parameters[ parameterIndex ] = provider.Resolve( parameterType );
                    // let attrIocWithName = pi.GetCustomAttributeOne( System.Reflection.TypeOf( Autofac.CWithNameAttribute ) );
                    // if ( attrIocWithName != null )
                    // {
                    //     parameters[ parameterIndex ] = provider.ResolveNamed( parameterType, attrIocWithName.Name );
                    // }
                    // else
                    // {
                    //     let attrIocWithKey = pi.GetCustomAttributeOne( System.Reflection.TypeOf( Autofac.CWithKeyAttribute ) );
                    //     if ( attrIocWithKey != null )
                    //     {
                    //         parameters[ parameterIndex ] = provider.ResolveKeyed( parameterType, attrIocWithKey.Key );
                    //     }
                    //     else
                    //     {
                    //         parameters[ parameterIndex ] = provider.Resolve( parameterType );
                    //     }
                    // }
                    continue;
                }
            }

            return methodInfo.Invoke( caller, ...parameters );
        }
    }
}
