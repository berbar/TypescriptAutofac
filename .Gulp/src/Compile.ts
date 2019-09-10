
import * as gulp from "gulp";
import { ProjectNode } from "./Project";

const tasks: string[] = [];

export function GetCompileTaskName( projectName: string ): string
{
    return "compile-" + projectName;
}


export function DefineCompileTasks( projects: ProjectNode[], dirDist: string ): void
{
    for ( const projectNode of projects )
    {
        let taskName = GetCompileTaskName( projectNode.name );
        gulp.task( taskName, function()
        {
            return projectNode.tsProject.src()
                .pipe(projectNode.tsProject())
                .pipe(gulp.dest(dirDist))
        });
        tasks.push( taskName );
    }
}

export function GetCompileTasks(): string[]
{
    return tasks;
}
