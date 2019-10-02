
import * as path from "path";
import * as gulp from "gulp";
import { ProjectNode } from "./Project";
import { IEnvs } from "./Env";
import ts = require( "typescript" );
import * as gulpts from  "gulp-typescript";

const tasks: string[] = [];

export function GetCompileTaskName( projectName: string ): string
{
    return "compile-" + projectName;
}


export function DefineCompileTasks( projects: ProjectNode[], env: IEnvs ): void
{
    for ( const projectNode of projects )
    {
        let taskName = GetCompileTaskName( projectNode.name );
        gulp.task( taskName, function()
        {
            projectNode.tsProject.options.outFile = path.resolve( env.DirBin, projectNode.name, "index.js" );
            return projectNode.tsProject.src()
                .pipe(projectNode.tsProject( gulpts.reporter.defaultReporter() ))
                .pipe(gulp.dest( "./" ) )
        });
        tasks.push( taskName );
    }
}

export function GetCompileTasks(): string[]
{
    return tasks;
}
