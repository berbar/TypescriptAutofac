


namespace iberbar.Autofac.Activators.Reflection
{
    export class CConstructorParameterBinding
    {
        private m_canInstantiate: boolean = false;

        private readonly m_ci: System.Reflection.CConstructorInfo = null;

        private m_valueRetrievers: (() => object)[] = null;

        private m_firstNonBindableParameter: System.Reflection.CParameterInfo = null;

        public constructor( ci: System.Reflection.CConstructorInfo, availableParameters: Core.CParameter[], context: IComponentContext )
        {
            this.m_ci = ci;
            this.m_canInstantiate = true;

            
            let parameters = ci.GetParameters();

            this.m_valueRetrievers = Array( parameters.length );

            for ( let i = 0; i < parameters.length; i++ )
            {
                let pi = parameters[ i ];
                let foundValue = false;
                for ( let j = 0; j < availableParameters.length; j ++ )
                {
                    let param = availableParameters[ j ];
                    let canSupplyValue = param.CanSupplyValue( pi, context );
                    if ( canSupplyValue.ret == true )
                    {
                        this.m_valueRetrievers[ i ] = canSupplyValue.valueProvider;
                        foundValue = true;
                        break;
                    }
                }

                if ( foundValue == false )
                {
                    this.m_canInstantiate = false;
                    this.m_firstNonBindableParameter = pi;
                    break;
                }
            }
        }

        public Instantiate(): object
        {
            if ( this.CanInstantiate == false )
                throw new Error();

            let values: object[] = Array( this.m_valueRetrievers.length );
            for ( let i = 0; i < this.m_valueRetrievers.length; i ++ )
            {
                let m_valueRetrieverTemp = this.m_valueRetrievers[ i ];
                if ( m_valueRetrieverTemp == null || m_valueRetrieverTemp == undefined )
                    continue;
                values[ i ] = m_valueRetrieverTemp();
            }

            try
            {
                return this.m_ci.Invoke( ...values );
            }
            catch ( e )
            {
                throw e;
            }
        }

        public get CanInstantiate(): boolean
        {
            return this.m_canInstantiate;
        }
    }
}