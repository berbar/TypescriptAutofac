

namespace iberbar.Autofac.Activators.Reflection
{
    export class CAutowiringParameter extends Core.CParameter
    {
        public CanSupplyValue(
            pi: System.Reflection.CParameterInfo,
            context: IComponentContext
        ): { ret: boolean, valueProvider?: () => object }
        {
            let registration: Core.IComponentRegistration;
            if ( pi.GetCustomAttributeOne( System.Reflection.TypeOf( CInjectLifetimeScopeAttribute ) ) != null )
            {
                registration = context.ComponentRegistry.GetRegistration( new Core.CLifetimeScopeService() );
                if ( registration == null )
                    return { ret: false };

                return {
                    ret: true,
                    valueProvider: () => context.ResolveComponent( registration, [] )
                };
            }

            if ( pi.ParameterType == null )
                return { ret: false };

            registration = context.ComponentRegistry.GetRegistration( new Core.CTypedService( pi.ParameterType ) );
            if ( registration == null )
                return { ret: false };

            return {
                ret: true,
                valueProvider: () => context.ResolveComponent( registration, [] )
            };
        }
        
    }
}