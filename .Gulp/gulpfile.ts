
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
import * as ExportsAndImports from "./src/ExportsAndImports";
import Clean from "./src/Clean";


type UCompileOptions =
{
    out: string;
    projects: string[]
    module: "amd" | "system";
    mergeOneFile: boolean;
    watch: boolean;
    platform: "browser" | "nodejs";
};

let uCompileOptions: UCompileOptions =
{
    out: FindArgument( "out" ),
    projects: [],
    module: <any>FindArgument( "module" ),
    mergeOneFile: false,
    watch: false,
    platform: "browser"
};
if ( uCompileOptions.out.endsWith( ".js" ) )
{
    uCompileOptions.mergeOneFile = true;
}

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
// const uCompileOptions =
// {
//     outDir: FindArgument( "outDir" ),
//     projectNames: projectNames
// };
const dirWorkspace = path.resolve( "../" );
const dirDist = path.resolve( uCompileOptions.out );
const dirBin = path.resolve( path.dirname( dirDist ), "bin" );
Clean( dirBin, dirDist );
fs.mkdirSync( dirBin );
fs.mkdirSync( dirDist );

const projects = Project.ScanProjects( dirWorkspace, projectNames );

Compile.DefineCompileTasks( projects, dirDist );

const exportFiles = ExportsAndImports.CreateExports( projectNames, dirBin );
const importFiles = ExportsAndImports.CreateImports( projectNames );

function WatchPartOf( projectName: string ): void
{
    const tasksMerge = Merge( projectNames, { dirBin: dirBin, dirDist: dirDist }, importFiles, exportFiles );
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
    const tasksMerge = Merge( projectNames, { dirBin: dirBin, dirDist: dirDist }, importFiles, exportFiles );
    const tasksCompile = Compile.GetCompileTasks();
    const tasks = tasksCompile.concat( tasksMerge );
    return tasks;
}

let tasksInit = CompileAll();
if ( uCompileOptions.watch == true )
    tasksInit.push( "watch" );
export default gulp.series( tasksInit );
