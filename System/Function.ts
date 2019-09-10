

namespace System
{
    export class CFunction< T extends Function >
    {
        protected func: T = null;
        
        constructor( func: T )
        {
            this.func = func;
        }
        
        get Invoke(): T
        {
            return this.func;
        }
    };
}