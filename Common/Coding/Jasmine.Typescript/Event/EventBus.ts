

namespace iberbar.Event
{
    export abstract class IEventBus
    {
        public abstract Listen< TEvent extends CEvent >( eventType: System.Reflection.CType< TEvent >, listener: System.TCallbackOrFunction< UEventBusListenerFunction< TEvent > >, once?: boolean ): void;

        public abstract Send< TEvent extends CEvent >( eventData: TEvent ): void;
    };

    export type UEventBusListenerFunction< TEvent extends CEvent > = ( eventData: TEvent ) => void;
    export type IEventBusListener< TEvent extends CEvent > = System.TCallback< UEventBusListenerFunction< TEvent > >;

}