
/// <reference path="./Attribute.ts" />


namespace System
{
    export class CAttributeUsage extends CAttribute
    {
        protected m_validOn: number;
        protected m_allowMultiple?: boolean;
        protected m_inherited?: boolean;

        public get ValidOn() : number {
            return this.m_validOn;
        }
        
        public get AllowMultiple(): boolean
        {
            return this.m_allowMultiple;
        }

        public get Inherited(): boolean
        {
            return this.m_inherited;
        }

        public constructor( validOn: number, allowMultiple?: boolean, inherit?: boolean )
        {
            super();
            this.m_validOn = validOn;
            this.m_allowMultiple = ( allowMultiple == null ) ? true : allowMultiple;
            this.m_inherited = ( inherit == null ) ? true : inherit;
        }

        public static DefaultUsage = new CAttributeUsage( UAttributeTarget.All, true, true );
    };
}