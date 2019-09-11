
import * as fs from "fs";

export function Clean( dirBin: string, dirDist: string ): void
{
    fs.rmdirSync( dirBin);
    fs.rmdirSync( dirDist );
}

export function DeleteFolder(): void
{
    
}

export default Clean;