

import * as fs from "fs";
import * as path from "path";
import * as gulp from "gulp";
import * as concat from "gulp-concat";

export function Merge( projectNames: string[], options: { dirBin: string, dirDist: string } ): string[]
{
    function MergeJS()
    {
        let srcList: string[] = [];
        srcList.push( "./src/imports_js.js" );
        for ( const projectName of projectNames )
        {
            srcList.push( path.join( options.dirBin, "types", projectName, "index.js" ) );
        }
        srcList.push( "./src/exports_js.js" );
        
        return gulp.src( srcList )
            .pipe( concat( "jasmine.js" ) )
            .pipe( gulp.dest( options.dirDist ) );
    }
    
    function MergeDeclarationFiles()
    {
        let srcList: string[] = [];
        srcList.push( "./src/imports_ts.d.ts" );
        for ( const projectName of projectNames )
        {
            srcList.push( path.join( options.dirBin, "types", projectName, "index.d.ts" ) );
        }
        srcList.push( "./src/exports_ts.d.ts" );
        return gulp.src( srcList )
            .pipe( concat( "jasmine.d.ts" ) )
            .pipe( gulp.dest( options.dirDist ) );
    }

    gulp.task( "MergeJS", MergeJS );
    gulp.task( "MergeDeclarationFiles", MergeDeclarationFiles );
    return [ "MergeJS", "MergeDeclarationFiles" ];
}



