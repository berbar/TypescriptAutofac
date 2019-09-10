
import * as ts from "gulp-typescript";
import * as path from "path";
import * as fs from "fs";

export type ProjectNode = {
    tsProject: ts.Project,
    name: string,
};


export function ScanProjects( dirWorkspace: string, projectNames: string[] ): ProjectNode[]
{
    let projects: ProjectNode[] = [];
    for ( const projectName of projectNames )
    {
        let tsconfig = path.resolve( dirWorkspace, projectName, "tsconfig.json" );
        if ( fs.existsSync( tsconfig ) )
        {
            projects.push( {
                name: projectName,
                tsProject: ts.createProject( tsconfig )
            })
        }
    }
    return projects;
}