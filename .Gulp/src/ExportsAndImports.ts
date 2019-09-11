
import * as path from "path";
import * as fs from "fs";


export type UExports =
{
    javascript: string[];
    typescript: string[];
};

export type UImports =
{
    javascript: string[];
    typescript: string[];
};

export function CreateExports( projectNames: readonly string[], dirBin: string ): UExports
{
    let exportsNamespaces: string[] = [];
    for ( const pn of projectNames )
    {
        let n = pn.split( "." )[ 0 ];
        if ( exportsNamespaces.indexOf( n ) >= 0 )
            continue;
        exportsNamespaces.push( pn );
    }

    console.debug( "export namespace %O", exportsNamespaces );

    let stream: fs.WriteStream;
    let exportsNamespacesJavascriptText = "exports = {" + exportsNamespaces.join( "," ) + "};";
    let exportsNamespacesJavascript = path.resolve( dirBin, "exports_js.js" );
    stream = fs.createWriteStream( exportsNamespacesJavascript, { encoding: "utf8" } );
    stream.write( exportsNamespacesJavascriptText );
    stream.close();

    let exportsNamespacesTypescriptText = "export {" + exportsNamespaces.join( "," ) + "};";
    let exportsNamespacesTypescript = path.resolve( dirBin, "exports_ts.d.ts" );
    stream = fs.createWriteStream( exportsNamespacesTypescript, { encoding: "utf8" } );
    stream.write( exportsNamespacesTypescriptText );
    stream.close();

    return {
        javascript: [
            exportsNamespacesJavascript
        ],
        typescript: [
            exportsNamespacesTypescript
        ]
    };
}


export function CreateImports( projectNames: readonly string[] ): UImports
{
    return {
        javascript: [],
        typescript: []
    };
}
