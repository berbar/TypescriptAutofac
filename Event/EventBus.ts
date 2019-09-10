

namespace Event
{
    export class IEventBus
    {
        public Listen< TEvent extends CEvent >( eventType: System.Reflection.CType< TEvent >, listener: IEventBus.IEventBusListener< TEvent >, once?: boolean ): void
        {
        }

        public Send< TEvent extends CEvent >( eventData: TEvent ): void
        {
        }
    };

    export namespace IEventBus
    {
        export type IEventBusListener< TEvent extends CEvent > = System.TCallback< ( eventData: TEvent ) => void >;
    }

}