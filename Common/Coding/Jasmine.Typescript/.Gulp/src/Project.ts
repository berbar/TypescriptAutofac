
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
    GetProjects(): ReadonlyArray< ProjectNode >;
};


type UProjectInfo =
{
    children: Array< string >;
    parents: Array< string >;
};


export class CProjectManager implements IProjectManager
{
    private readonly m_env: IEnvs = null;
    private readonly m_projectNodes: Array< ProjectNode > = Array();

    private readonly m_projectInfos: { [ project: string ]: UProjectInfo } = {};

    public constructor( env: IEnvs )
    {
        this.m_env = env;
    }

    public InitProjects(): this
    {
        for ( const projectName of this.m_env.CompileOptions.Projects )
        {
            this.AddProject( projectName );
        }

        if ( this.m_projectNodes.length )
            throw new Error( "No projects!" )

        console.log( this.m_projectNodes );
        console.log( this.m_projectInfos );

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
        let referenceNames: Array< string > = Array();;
        if ( projectNode.tsProject.projectReferences != null &&
            projectNode.tsProject.projectReferences.length > 0 )
        {
            for ( const reference of projectNode.tsProject.projectReferences )
            {
                let refName = path.basename( reference.path );
                referenceNames.push( refName );
                this.AddProject( refName );
            }
        }
        if ( this.m_projectNodes.firstOrDefault( n => n.name == projectName ) == null )
            this.m_projectNodes.push( projectNode );

        this.UpdateProjectInfo( projectName, referenceNames );
    }

    public GetParents(project: string): string[] {
        throw new Error("Method not implemented.");
    }
    public GetChildren(project: string): string[]
    {
        throw new Error("Method not implemented.");
    }
    public GetProjects(): ReadonlyArray< ProjectNode >
    {
        return this.m_projectNodes;
    }

    private UpdateProjectInfo( project: string, references: Array< string > ): void
    {
        for ( const reference of references )
        {
            let info = this.m_projectInfos[ reference ];
            if ( info == null )
            {
                info = this.m_projectInfos[ reference ] = {
                    children: Array(),
                    parents: Array(),
                };
            }
            info.children.push( project );
        }
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