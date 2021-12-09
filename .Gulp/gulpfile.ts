
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


function MkdirRecurse( p: string ): void
{
    let dir = path.dirname( p );
    if ( fs.existsSync( dir ) == false )
    {
        MkdirRecurse( dir );
    }
    fs.mkdirSync( p );
}

let envs: IEnvs = BuildEnvs();

console.log( "--环境：" );
console.log( envs.toString() );
console.log( "\n" );

console.log( "--编译选项：" );
console.log( envs.CompileOptions.toString() );
console.log( "\n" );

console.log( "--编译目标路径: " );
console.log( envs.DirDist );
console.log( "\n" );

if ( envs.CompileOptions.Projects.length == 0 )
{
    throw new Error( "no projects" );
}

envs.Cleanup();
if ( fs.existsSync( envs.DirBin ) == false )
    MkdirRecurse( envs.DirBin );
    //fs.mkdirSync( envs.DirBin );
if ( fs.existsSync( envs.DirDist ) == false )
    MkdirRecurse( envs.DirDist );
    //fs.mkdirSync( envs.DirDist );

let projectManager = new Project.CProjectManager( envs );
const projects = projectManager.GetProjects();

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



var reload = false;
var delay = 500;

// function brsync_reload(done) { brsync.reload();                 queue_reset(done); }
// function brsync_stream(done) { brsync.reload({ stream: true }); queue_reset(done); }

// function queue_reload() { gulp.series(gulp.queue.concat(brsync_reload))(); }
// function queue_stream() { gulp.series(gulp.queue.concat(brsync_stream))(); }
// function queue_reset(done)  { gulp.queue = []; reload = false; done(); }

// function queue_tasks(tasks, last) {
//   reload = reload || last == brsync_reload;
//   gulp.queue = gulp.queue || [];

//   if (gulp.queue.length == 0)
//     setTimeout(reload ? queue_reload : queue_stream, delay);

//   gulp.queue = gulp.queue
//     .concat(tasks.filter(task => !gulp.queue.some(queued => queued == task)));
//   // console.log(gulp.queue);
// }

function WatchPartOf( projectName: string ): void
{
    let projectChildren = projectManager.GetChildren( projectName );
    let projectCompile = [ projectName ].concat( projectChildren );
    console.log( "监控[%s]: %O", projectName, projectChildren );
    let tasksCompile = Compile.GetCompileTasks( projectCompile );
    let tasksMerge = Merge( envs, projectManager, importFiles, exportFiles );
    let tasks = tasksCompile.concat( tasksMerge );
    let glops = path.resolve( envs.DirWorkspace, projectName, "**/*.ts" );
    gulpWatch( glops, gulp.series( tasks ) );
}

gulp.task( "watch", function()
{
    let projectsAll = projectManager.GetProjects();
    for ( const project of projectsAll )
    {
        WatchPartOf( project.name );
    }
});

function CompileAll(): string[]
{
    const tasksMerge = Merge( envs, projectManager, importFiles, exportFiles );
    const tasksCompile = Compile.GetCompileTasks();
    const tasks = tasksCompile.concat( tasksMerge );
    return tasks;
}

let tasksInit = CompileAll();
if ( envs.CompileOptions.Watch == true )
    tasksInit.push( "watch" );
export default gulp.series( tasksInit );
