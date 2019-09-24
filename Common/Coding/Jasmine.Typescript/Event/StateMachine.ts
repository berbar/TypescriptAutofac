


namespace iberbar.Event
{
    export class IStateMachine
    {
        AddState( state: IStateNode ): void
        {
            throw new Error('Not implements');
        }

        GetState< TStateNode extends IStateNode >( stateType: System.Reflection.CType< TStateNode > ): TStateNode
        {
            throw new Error('Not implements');
        }
    }
}



