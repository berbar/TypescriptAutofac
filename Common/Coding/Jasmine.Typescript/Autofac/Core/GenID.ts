
namespace Ioc.Core
{
    var genID = 0;
    export function GenID(): string
    {
        genID ++;
        return genID.toString();
    }
}
