

namespace Event.Implements
{
    type UEventDelegate =
    {
        listener: IEventBus.IEventBusListener< CEvent >;
        kick: number;
    };

    type UEventDelegateList = Array< UEventDelegate >;

    export class CEventBus extends IEventBus
    {
        protected m_events: WeakMap< System.Reflection.TypePrototype< CEvent >, UEventDelegateList > = new WeakMap();

        public Listen< TEvent extends CEvent >( eventType: System.Reflection.CType< TEvent >, listener: IEventBus.IEventBusListener< TEvent >, once?: boolean ): void
        {
            let prototype = eventType.GetJsPrototype<{}>();
            let array = this.m_events.get( prototype );
            if ( array == null )
            {
                array = Array();
                array.push( {
                    listener: listener,
                    kick: ( once == true ) ? 1 : -1
                } );
                this.m_events.set( prototype, array );
            }
            else
            {
                for( let i = 0; i < array.length; i ++ )
                {
                    let delegateTemp = array[ i ];
                    if ( delegateTemp.listener == listener )
                        return;
                }
                array.push( {
                    listener: listener,
                    kick: ( once == true ) ? 1 : -1
                });
            }
        }

        public Send< TEvent extends CEvent >( eventData: TEvent ): void
        {
            let prototype = eventData.GetType().GetJsPrototype< {} >();
            let delegates = this.m_events.get( prototype );
            if ( delegates == null )
                return;
            for ( let i = 0; i < delegates.length; i ++ )
            {
                let delegateTemp = delegates[ i ];
                if ( delegateTemp.kick == 0 )
                    continue;

                delegateTemp.kick --;
                delegateTemp.listener.Execute( eventData );
            }
            for ( let i = 0; i < delegates.length; )
            {
                let delegateTemp = delegates[ i ];
                if ( delegateTemp.kick == 0 )
                {
                    delegates.splice( i, 1 );
                }
                else
                {
                    i++;
                }
            }
        }
    };
}

