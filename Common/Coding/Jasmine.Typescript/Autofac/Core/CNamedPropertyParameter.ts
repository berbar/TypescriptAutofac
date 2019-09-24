
/// <reference path="./CConstantParameter.ts" />


namespace iberbar.Autofac.Core
{
    export class CNamedPropertyParameter extends CConstantParameter
    {
        public constructor( name: string, value: object )
        {
            super( value, pi => true );
        }
    }
}