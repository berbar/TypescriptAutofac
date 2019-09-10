

namespace Autofac.Core.Resolving
{
    export interface IResolutionExtension
    {
        /**
         * 获取实例
         * @param type 依赖类型
         */
        Resolve< TService extends object >(
            type: System.Reflection.CType< TService >,
            ...parameters: CParameter[]
        ): TService;

        /**
         * 获取实例
         * @param type 依赖类型
         * @param name 键名
         */
        ResolveNamed< TService extends object >(
            type: System.Reflection.CType< TService >,
            name: string,
            ...parameters: CParameter[]
        ): TService;

        /**
         * 获取实例
         * @param type 依赖类型
         * @param key 键名
         */
        ResolveKeyed< TService extends object, TKey >(
            type: System.Reflection.CType< TService >,
            key: TKey,
            ...parameters: CParameter[]
        ): TService;
    }
}