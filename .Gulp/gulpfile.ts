
import * as fs from "fs";
import * as path from "path";
import * as gulp from "gulp";
import * as gulpWatch from "gulp-watch";
import * as Project from "./src/Project";
import { Merge } from "./src/Merge";
import * as Compile from "./src/Compile";
import { CExportsAndImports } from "./src/ExportsAndImports";

import "../System/JsArrayExtension";
import { IEnvs, BuildEnvs } from "./src/Env";


let envs: IEnvs = BuildEnvs();

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

envs.Cleanup();
if ( fs.existsSync( envs.DirBin ) == false )
    fs.mkdirSync( envs.DirBin );
if ( fs.existsSync( envs.DirDist ) == false )
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
    const tasksCompile = Compile.GetCompileTasks( projectName );
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
