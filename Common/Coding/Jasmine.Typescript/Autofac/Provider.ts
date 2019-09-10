

namespace Autofac
{
    /**
     * **（接口）**
     * 
     * Autofac提供器
     */
    export interface IProvider
    {
        /**
         * 获取实例
         * @param type 依赖类型
         */
        Resolve< TService extends object >(
            type: System.Reflection.CType< TService >
        ): TService;

        /**
         * 获取实例
         * @param type 依赖类型
         * @param name 键名
         */
        ResolveNamed< TService extends object >(
            type: System.Reflection.CType< TService >,
            name: string
        ): TService;

        /**
         * 获取实例
         * @param type 依赖类型
         * @param key 键名
         */
        ResolveKeyed< TService extends object, TKey extends IKey >(
            type: System.Reflection.CType< TService >,
            key: TKey
        ): TService;

        //ResolveIndex< TKey extends IKey, TService extends object >(): CIndex< TKey, TService >;
    };
}