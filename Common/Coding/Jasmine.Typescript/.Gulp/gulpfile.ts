
import * as fs from "fs";
import * as path from "path";
import * as gulp from "gulp";
import * as concat from "gulp-concat";
import * as ts from "gulp-typescript";
import * as uglify from "gulp-uglify";
import * as gulpWatch from "gulp-watch";
import { HasArgument, FindArgument, CArgumnetsCollection, IArgumentCollection as IArgumentsCollection } from "./src/Arguments";
import * as Project from "./src/Project";
import { Merge } from "./src/Merge";
import * as Compile from "./src/Compile";
import { CExportsAndImports } from "./src/ExportsAndImports";
import Clean from "./src/Clean";
//import iberbar, { TypeOf, DeclaringType } from "../dist/commonjs/jasmine";

import "../System/JsArrayExtension";
import { IEnvs, BuildEnvs } from "./src/Env";


// class CCompileOptions
// {
//     @DeclaringType( TypeOf( String ) )
//     @ArgumentName( "out" )
//     out: string = null;

//     @DeclaringType( TypeOf( String ) )
//     @ArgumentName( "module" )
//     @ArgumentEnumValue( "amd", "commonjs" )
//     module: "amd" | "commonjs" = "amd";

//     @DeclaringType( TypeOf( Boolean ) )
//     @ArgumentName( "watch" )
//     watch: boolean = false;

//     @DeclaringType( TypeOf( Array ), [ TypeOf( String ) ] )
//     projects: Array< string > = null;
// }


let envs: IEnvs = BuildEnvs();

// let uArgvCollection: IArgumentsCollection = new CArgumnetsCollection( process.argv );

// type UCompileOptions =
// {
//     out: string;
//     projects: string[]
//     module: "amd" | "system";
//     mergeOneFile: boolean;
//     watch: boolean;
//     platform: "browser" | "nodejs";
// };

// // 获取编译选项
// let uCompileOptions: UCompileOptions =
// {
//     out: uArgvCollection.FindStrings( "out", true ).firstOrDefault(),
//     projects: uArgvCollection.FindStrings( "project", false ),
//     module: <any>uArgvCollection.FindStrings( "module", true ).firstOrDefault(),
//     mergeOneFile: false,
//     watch: uArgvCollection.FindBoolean( "watch" ),
//     platform: <any>uArgvCollection.FindStrings( "platform", false ).firstOrDefault()
// };
// if ( uCompileOptions.out.endsWith( ".js" ) )
// {
//     uCompileOptions.mergeOneFile = true;
// }
console.log( "--环境：" );
console.log( envs.toString() );
console.log( "\n" );

console.log( "--编译选项：" );
console.log( envs.CompileOptions.toString() );
console.log( "\n" );

if ( envs.CompileOptions.Projects.length == 0 )
{
    throw new Error( "no projects" );
}

//Clean( envs.DirBin, envs.DirDist );
envs.Cleanup();
fs.mkdirSync( envs.DirBin );
fs.mkdirSync( envs.DirDist );

const projects = Project.ScanProjects( envs.DirWorkspace, envs.CompileOptions.Projects );

Compile.DefineCompileTasks( projects, envs );

let uExportsAndImports = new CExportsAndImports( envs );
const exportFiles = uExportsAndImports.CreateExports();
const importFiles = uExportsAndImports.CreateImports();
console.log( "--将要合并的导出文件列表" );
console.log( exportFiles );
console.log( "\n" );
console.log( "--将要合并的导入文件列表" );
console.log( importFiles );
console.log( "\n" );

function WatchPartOf( projectName: string ): void
{
    const tasksMerge = Merge( envs, importFiles, exportFiles );
    const tasksCompile = [ Compile.GetCompileTaskName( projectName ) ];
    const tasks = tasksCompile.concat( tasksMerge );
    let glops = path.resolve( envs.DirWorkspace, projectName, "**/*.ts" );
    gulpWatch( glops, gulp.series( tasks ) );
}

gulp.task( "watch", function()
{
    for ( const projectName of envs.CompileOptions.Projects )
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
    const tasksMerge = Merge( envs, importFiles, exportFiles );
    const tasksCompile = Compile.GetCompileTasks();
    const tasks = tasksCompile.concat( tasksMerge );
    return tasks;
}

let tasksInit = CompileAll();
if ( envs.CompileOptions.Watch == true )
    tasksInit.push( "watch" );
export default gulp.series( tasksInit );
