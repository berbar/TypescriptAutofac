

namespace Ioc
{
    export interface ILifetimeScope extends System.IDisposable, IComponentContext, Core.Resolving.IResolutionExtension
    {
        GetTag() : ULifetimeScopeTagType;

        BeginLifetimeScope( tag?: ULifetimeScopeTagType ): ILifetimeScope;

        GetDisposer(): Core.IDisposer;
    }
}

