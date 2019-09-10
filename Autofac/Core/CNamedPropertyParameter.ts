
/// <reference path="./CConstantParameter.ts" />


namespace Autofac.Core
{
    export class CNamedPropertyParameter extends CConstantParameter
    {
        public constructor( name: string, value: object )
        {
            super( value, pi => true );
        }
    }
}