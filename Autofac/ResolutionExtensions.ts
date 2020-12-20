


namespace iberbar.Autofac
{
    export function Resolve<TService extends object>( componentContext: IComponentContext, type: System.Reflection.CType<TService>, ...parameters: Core.CParameter[] ): TService
    {
        let ret = TryResolveService( componentContext, new Core.CTypedService( type ), parameters );
        if ( ret.succeed == false )
        {
            throw new Error( `Can't resolve instance of type (${type.GetNickname()})` );
        }
        return <TService>ret.instance;
    }

    export function TryResolveService( componentContext: IComponentContext, service: Core.CService, parameters: Core.CParameter[] ): { succeed: boolean, instance?: object }
    {
        let registration = componentContext.ComponentRegistry.GetRegistration( service );
        if ( registration == null )
        {
            return {
                succeed: false
            };
        }
        return {
            succeed: true,
            instance: componentContext.ResolveComponent( registration, parameters )
        };
    }
}