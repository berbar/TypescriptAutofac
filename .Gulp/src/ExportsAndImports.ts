
import * as path from "path";
import * as fs from "fs";
import { IEnvs, UCompilePlatform } from "./Env";


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

export class CExportsAndImports
{
    public ProjectNames: ReadonlyArray< string > = null;

    public DirBin: string = null;

    public DirWorkspace: string = null;

    private readonly m_env: IEnvs = null;

    public constructor( envs: IEnvs )
    {
        this.ProjectNames = envs.CompileOptions.Projects;
        this.DirBin = envs.DirBin;
        this.DirWorkspace = envs.DirWorkspace;
        this.m_env = envs;
    }

    public CreateExports(): UExports
    {
        let exportsCache: UExports =
        {
            javascript: [],
            typescript: []
        }

        if ( this.m_env.CompileOptions.Platform == UCompilePlatform.NodeJS )
        {
            for ( const pn of this.ProjectNames )
            {
                this.FindCommonJS( exportsCache, pn );
            }
            this.FindCommonJS( exportsCache, ".Gulp" );
        }

        return exportsCache;
    }

    public CreateImports(): UImports
    {
        return {
            javascript: [],
            typescript: []
        };
    }

    private FindCommonJS( exportsCache: UExports, workspace: string ): void
    {
        let pathCommonJs = path.resolve( this.DirWorkspace, workspace, "__CommonJs" );
        if ( fs.existsSync( pathCommonJs ) == false || fs.statSync( pathCommonJs ).isDirectory() == false )
            return;
        let pathExportsTS = path.resolve( pathCommonJs, "Exports.d.ts" );
        let pathExportsJS = path.resolve( pathCommonJs, "Exports.js" );

        if ( fs.existsSync( pathExportsTS ) && fs.existsSync( pathExportsTS ) )
        {
            exportsCache.javascript.push( pathExportsJS );
            exportsCache.typescript.push( pathExportsTS );
        }
    }
}

// export function CreateExports( projectNames: readonly string[], dirBin: string ): UExports
// {
//     let exportsCache: UExports =
//     {
//         javascript: [],
//         typescript: []
//     }

//     let exportsNamespaces: string[] = [];
//     // for ( const pn of projectNames )
//     // {
//     //     let n = pn.split( "." )[ 0 ];
//     //     if ( exportsNamespaces.indexOf( n ) >= 0 )
//     //         continue;
//     //     exportsNamespaces.push( pn );
//     // }
//     exportsNamespaces.push( "iberbar" );

//     for ( const pn of projectNames )
//     {

//     }

//     console.debug( "export namespace %O", exportsNamespaces );

//     let stream: fs.WriteStream;
//     let exportsNamespacesJavascriptText = "exports = {" + exportsNamespaces.join( "," ) + "};";
//     let exportsNamespacesJavascript = path.resolve( dirBin, "exports_js.js" );
//     stream = fs.createWriteStream( exportsNamespacesJavascript, { encoding: "utf8" } );
//     stream.write( exportsNamespacesJavascriptText );
//     stream.close();

//     let exportsNamespacesTypescriptText = "export {" + exportsNamespaces.join( "," ) + "};";
//     let exportsNamespacesTypescript = path.resolve( dirBin, "exports_ts.d.ts" );
//     stream = fs.createWriteStream( exportsNamespacesTypescript, { encoding: "utf8" } );
//     stream.write( exportsNamespacesTypescriptText );
//     stream.close();

//     return {
//         javascript: [
//             exportsNamespacesJavascript
//         ],
//         typescript: [
//             exportsNamespacesTypescript
//         ]
//     };

//     // return {
//     //     javascript: [
//     //         ""
//     //     ],
//     //     typescript: [
//     //         ""
//     //     ]
//     // }
// }


// export function CreateImports( projectNames: readonly string[] ): UImports
// {
//     return {
//         javascript: [],
//         typescript: []
//     };
// }
