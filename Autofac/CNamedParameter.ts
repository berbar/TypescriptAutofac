
/// <reference path="./Core/CConstantParameter.ts" />


namespace Autofac
{
    export class CNamedParameter extends Core.CConstantParameter
    {
        public constructor( name: string, value: object )
        {
            super( value, pi => false );
        }
    }
}
