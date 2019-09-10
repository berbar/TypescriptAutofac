

namespace Ioc.Activators.Reflection
{
    export class CAutowiringParameter extends Core.CParameter
    {
        public CanSupplyValue(
            pi: System.Reflection.CParameterInfo,
            context: IComponentContext,
            valueProvider: System.OutParameter<() => object>
        ): boolean
        {
            let registration: Core.IComponentRegistration;
            if ( pi.GetCustomAttributeOne( System.Reflection.TypeOf( CInjectLifetimeScopeAttribute ) ) != null )
            {
                registration = context.ComponentRegistry.GetRegistration( new Core.CLifetimeScopeService() );
                if ( registration == null )
                    return false;

                valueProvider.__out = () => context.ResolveComponent( registration, [] );
                return true;
            }

            if ( pi.ParameterType == null )
                return false;

            registration = context.ComponentRegistry.GetRegistration( new Core.CTypedService( pi.ParameterType ) );
            if ( registration == null )
                return false;

            valueProvider.__out = () => context.ResolveComponent( registration, [] );
            return true;
        }
        
    }
}