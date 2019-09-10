

namespace Event
{
    export class CEvent
    {
    };

    // export interface TEventConstructor< TEvent extends CEvent >
    // {
    //     new ( ...args: any[] ): TEvent
    // };

    export type TEventConstructor< TEvent extends CEvent > = System.Reflection.TypeConstructor< TEvent >;
}