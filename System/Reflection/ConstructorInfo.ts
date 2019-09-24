
/// <reference path="./CMethodBase.ts" />


namespace iberbar.System.Reflection
{
    export abstract class CConstructorInfo extends CMethodBase
    {
        public get JsConstructor(): TypeConstructor< object >
        {
            return this.m_prototype.constructor;
        }

        public Invoke( ...args: any[] ): object
        {
            return new this.JsConstructor( ...args );
        }

        public abstract GetParameters(): Array< CParameterInfo >;
    }
}
