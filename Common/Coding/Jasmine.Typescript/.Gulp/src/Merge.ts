

import * as fs from "fs";
import * as path from "path";
import * as gulp from "gulp";
import * as concat from "gulp-concat";
import { UImports, UExports } from "./ExportsAndImports";
import { IEnvs, UCompilePlatform } from "./Env";
import { CBabelHelper } from "./Babel";
import { IProjectManager } from "./Project";

export function Merge( env: IEnvs, projectManager: IProjectManager, importFiles: UImports, exportFiles: UExports ): string[]
{
    let projects = projectManager.GetProjects();

    function MergeJS()
    {
        let srcList: string[] = [];
        for ( const f of importFiles.javascript )
        {
            srcList.push( f );
        }
        for ( const projectNode of projects )
        {
            srcList.push( path.join( env.DirBin, projectNode.name, "index.js" ) );
        }
        for ( const f of exportFiles.javascript )
        {
            srcList.push( f );
        }
        let babelCompiler = new CBabelHelper().GetCompiler();
        
        let taskCore = gulp.src( srcList ).pipe( concat( "iberbar/index.js" ) );
        if ( env.CompileOptions.Platform == UCompilePlatform.Browser )
        {
            taskCore.pipe( babelCompiler );
        }
        taskCore.pipe( gulp.dest( env.DirDist ) );
        return taskCore;
    }
    
    function MergeDeclarationFiles()
    {
        let srcList: string[] = [];
        for ( const f of importFiles.typescript )
        {
            srcList.push( f );
        }
        for ( const projectNode of projects )
        {
            srcList.push( path.join( env.DirBin, projectNode.name, "index.d.ts" ) );
        }
        for ( const f of exportFiles.typescript )
        {
            srcList.push( f );
        }
        return gulp.src( srcList )
            .pipe( concat( "iberbar/index.d.ts" ) )
            .pipe( gulp.dest( env.DirDist ) );
    }

    gulp.task( "MergeJS", MergeJS );
    gulp.task( "MergeDeclarationFiles", MergeDeclarationFiles );
    return [ "MergeJS", "MergeDeclarationFiles" ];
}


