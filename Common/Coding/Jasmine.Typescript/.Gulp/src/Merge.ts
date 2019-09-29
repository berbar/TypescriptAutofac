

import * as fs from "fs";
import * as path from "path";
import * as gulp from "gulp";
import * as concat from "gulp-concat";
import { UImports, UExports } from "./ExportsAndImports";

export function Merge( projectNames: string[], options: { dirBin: string, dirDist: string }, importFiles: UImports, exportFiles: UExports ): string[]
{
    function MergeJS()
    {
        let srcList: string[] = [];
        for ( const f of importFiles.javascript )
        {
            srcList.push( f );
        }
        for ( const projectName of projectNames )
        {
            srcList.push( path.join( options.dirBin, projectName, "index.js" ) );
        }
        for ( const f of exportFiles.javascript )
        {
            srcList.push( f );
        }
        
        return gulp.src( srcList )
            .pipe( concat( "jasmine.js" ) )
            .pipe( gulp.dest( options.dirDist ) );
    }
    
    function MergeDeclarationFiles()
    {
        let srcList: string[] = [];
        for ( const f of importFiles.typescript )
        {
            srcList.push( f );
        }
        for ( const projectName of projectNames )
        {
            srcList.push( path.join( options.dirBin, projectName, "index.d.ts" ) );
        }
        for ( const f of exportFiles.typescript )
        {
            srcList.push( f );
        }
        return gulp.src( srcList )
            .pipe( concat( "jasmine.d.ts" ) )
            .pipe( gulp.dest( options.dirDist ) );
    }

    gulp.task( "MergeJS", MergeJS );
    gulp.task( "MergeDeclarationFiles", MergeDeclarationFiles );
    return [ "MergeJS", "MergeDeclarationFiles" ];
}



