
/// <reference path="./Core/CConstantParameter.ts" />


namespace iberbar.Autofac
{
    export class CNamedParameter extends Core.CConstantParameter
    {
        public constructor( name: string, value: object )
        {
            super( value, pi => pi.Name == name );
        }
    }
}
