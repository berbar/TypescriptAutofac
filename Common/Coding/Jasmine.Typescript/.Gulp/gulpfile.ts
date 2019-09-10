
import * as fs from "fs";
import * as path from "path";
import * as gulp from "gulp";
import * as concat from "gulp-concat";
import * as ts from "gulp-typescript";
import * as uglify from "gulp-uglify";
import * as gulpWatch from "gulp-watch";
import { HasArgument, FindArgument } from "./src/Arguments";
import * as Project from "./src/Project";
import { Merge } from "./src/Merge";
import * as Compile from "./src/Compile";

let projectNamesStr = FindArgument( "projects" );
let projectNames: string[] = [
    // "system",
    // "ioc",
    // "network"
];
projectNames = ( projectNamesStr == null || projectNamesStr == "" ) ? projectNames : projectNamesStr.split( ":" );
console.debug( projectNames );
if ( projectNames.length == 0 )
{
    throw new Error( "no projects" );
}
const uCompileOptions =
{
    outDir: FindArgument( "outDir" ),
    projectNames: projectNames
};
const dirWorkspace = path.resolve( "../" );
const dirDist = path.resolve( ( uCompileOptions.outDir == null ) ? "dist" : uCompileOptions.outDir );
const dirBin = path.resolve( path.dirname( dirDist ), "bin" );

const projects = Project.ScanProjects( dirWorkspace, projectNames );

Compile.DefineCompileTasks( projects, dirDist );

function WatchPartOf( projectName: string ): void
{
    const tasksMerge = Merge( projectNames, { dirBin: dirBin, dirDist: dirDist } );
    const tasksCompile = [ Compile.GetCompileTaskName( projectName ) ];
    const tasks = tasksCompile.concat( tasksMerge );
    let glops = path.resolve( dirWorkspace, projectName, "**/*.ts" );
    gulpWatch( glops, gulp.series( tasks ) );
}

gulp.task( "watch", function()
{
    for ( const projectName of projectNames )
    {
        WatchPartOf( projectName );
    }
});

// gulp.task( "compile-all", function()
// {

//     const tasksMerge = Merge( projectNames, { dirBin: dirBin, dirDist: dirDist } );
//     const tasksCompile = Compile.GetCompileTasks();
//     const tasks = tasksCompile.concat( tasksMerge );
//     return gulp.series( tasks );
// });

function CompileAll(): string[]
{
    const tasksMerge = Merge( projectNames, { dirBin: dirBin, dirDist: dirDist } );
    const tasksCompile = Compile.GetCompileTasks();
    const tasks = tasksCompile.concat( tasksMerge );
    return tasks;
}

export default gulp.series( CompileAll().concat( "watch" ) );
