
import * as path from "path";
import * as gulp from "gulp";
import { ProjectNode } from "./Project";
import { IEnvs } from "./Env";
import ts = require( "typescript" );
import * as gulpts from  "gulp-typescript";
import * as gulpsourcemaps from "gulp-sourcemaps";
import * as gulpbabel from "gulp-babel";
import { CBabelHelper } from "./Babel";

const gTasks: string[] = [];

export function GetCompileTaskName( projectName: string ): string
{
    return "compile-" + projectName;
}

export function GetCompileTasks( projectNames?: string | ReadonlyArray< string > ): Array< string >
{
    let tasks = Array<string>();
    if ( projectNames == undefined )
        tasks = gTasks;
    else
    {
        if ( typeof( projectNames ) == "string" )
            tasks.push( "compile-" + projectNames );
        else
        {
            for ( const n of projectNames )
            {
                tasks.push( "compile-", n );
            }
        }
    }
    return tasks;
}


export function DefineCompileTasks( projects: ReadonlyArray< ProjectNode >, env: IEnvs ): void
{
    for ( const projectNode of projects )
    {
        let taskName = GetCompileTaskName( projectNode.name );
        projectNode.tsProject.options.outFile = path.resolve( env.DirBin, projectNode.name, "index.js" );
        gulp.task( taskName, function()
        {
            let taskCore = projectNode.tsProject.src();
            if ( env.CompileOptions.SourceMaps == true )
                taskCore = taskCore.pipe( gulpsourcemaps.init() )
            taskCore = taskCore.pipe( projectNode.tsProject( gulpts.reporter.defaultReporter() ) )
            if ( env.CompileOptions.SourceMaps == true )
                taskCore = taskCore.pipe( gulpsourcemaps.write( { sourceRoot: path.resolve( env.DirBin, projectNode.name ) }))
            taskCore = taskCore.pipe( gulp.dest( "./" ) );
            return taskCore;
        });
        gTasks.push( taskName );
    }
}
