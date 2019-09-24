

namespace iberbar.System
{
    export enum UAttributeTarget
    {
        Class = 0x0001,
        Field = 0x0002,
        Method = 0x0004,
        Parameter = 0x0008,
        Property = 0x0010,
        All = Class | Field | Method | Parameter | Property,
    };
}