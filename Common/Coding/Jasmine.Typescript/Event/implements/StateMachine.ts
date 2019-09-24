

namespace iberbar.Event.Implements
{
    export class CStateMachine extends IStateMachine
    {
        protected m_state: WeakMap< System.Reflection.TypePrototype< IStateNode >, IStateNode > = new WeakMap();

        public AddState( state: IStateNode ): void
        {
            let prototype: any = state.GetType().GetJsPrototype();
            let stateTemp = this.m_state.get( prototype );
            if ( stateTemp != null )
            {
                throw Error( "there is exist state" );
            }
            this.m_state.set( <any>prototype, state );
            state.Initialize();
        }

        public GetState< TStateNode extends IStateNode >( stateType: System.Reflection.CType< TStateNode > ): TStateNode
        {
            let prototype = stateType.GetJsPrototype();
            let state = this.m_state.get( prototype );
            return <TStateNode>state;
        }
    }
}