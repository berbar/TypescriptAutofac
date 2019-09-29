
import * as fs from "fs";
import * as path from "path";

export function Clean( dirBin: string, dirDist: string ): void
{
    if ( fs.existsSync( dirBin ) )
        DeleteFolder( dirBin );
    if ( fs.existsSync( dirDist ) )
        DeleteFolder( dirDist );
}

export function DeleteFolder( dir: string ): void
{
    let children = fs.readdirSync( dir );
    for ( const child of children )
    {
        let pathChild = path.resolve( dir, child );
        let stat = fs.statSync( pathChild );
        if ( stat.isDirectory() == true )
        {
            DeleteFolder( pathChild );
        }
        else
        {
            fs.unlinkSync( pathChild );
        }
    }
    fs.rmdirSync( dir );
}

export default Clean;