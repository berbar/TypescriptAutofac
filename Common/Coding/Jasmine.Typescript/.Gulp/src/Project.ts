
import * as ts from "gulp-typescript";
import * as path from "path";
import * as fs from "fs";
import { IEnvs } from "./Env";

export type ProjectNode = {
    tsProject: ts.Project,
    name: string,
};



export interface IProjectManager
{
    GetParents( project: string ): Array< string >;
    GetChildren( project: string ): Array< string >;
    GetProjects(): Array< string >;
};



export class CProjectManager implements IProjectManager
{
    private readonly m_env: IEnvs = null;
    private readonly m_projectNodes: Array< ProjectNode > = Array();

    public constructor( env: IEnvs )
    {
        this.m_env = env;
    }

    public InitProjects(): this
    {
        let projects: ProjectNode[] = [];
        for ( const projectName of this.m_env.CompileOptions.Projects )
        {
            this.AddProject( projectName );
        }

        if ( projects.length == 0 )
            throw new Error();

        return this;
    }

    private AddProject( projectName: string ): void
    {
        let tsconfig = path.resolve( this.m_env.DirWorkspace, projectName, "tsconfig.json" );
        if ( fs.existsSync( tsconfig ) == false )
            throw new Error( "" );

        let projectNode: ProjectNode = {
            name: projectName,
            tsProject: ts.createProject( tsconfig )
        };
        if ( projectNode.tsProject.projectReferences.length > 0 )
        {
            for ( const reference of projectNode.tsProject.projectReferences )
            {
                let refName = reference.path.substr( 2 );
                this.AddProject( refName );
            }
        }
        this.m_projectNodes.push( projectNode );
    }

    public GetParents(project: string): string[] {
        throw new Error("Method not implemented.");
    }
    public GetChildren(project: string): string[] {
        throw new Error("Method not implemented.");
    }
    public GetProjects(): string[] {
        throw new Error("Method not implemented.");
    }

    private ScanProjects( dirWorkspace: string, projectNames: ReadonlyArray< string > ): ProjectNode[]
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
}


export function ScanProjects( dirWorkspace: string, projectNames: ReadonlyArray< string > ): ProjectNode[]
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