
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
        for ( const projectName of this.m_env.CompileOptions.Projects )
        {
            this.AddProject( projectName );
        }

        if ( this.m_projectNodes.length == 0 )
            throw new Error( "No projects!" )

        //console.log( this.m_projectNodes );
        console.log( "--编译的项目: \n" );
        for ( const projectName in this.m_projectInfos )
        {
            console.log( "[%s] 引用该项目的项目列表: %s", projectName, this.m_projectInfos[ projectName ].children.join( "," ) );
        }
        //console.log( this.m_projectInfos );
    }

    private AddProject( projectName: string ): void
    {
        let tsconfig = path.resolve( this.m_env.DirWorkspace, projectName, "tsconfig.json" );
        if ( fs.existsSync( tsconfig ) == false )
            throw new Error( `Can't find the tsconfig<${tsconfig}>.` );

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
        if ( this.m_projectNodes.FirstOrDefault( n => n.name.toLowerCase() == projectName.toLowerCase() ) == null )
            this.m_projectNodes.push( projectNode );

        this.UpdateProjectInfo( projectName, referenceNames );
    }

    public GetParents(project: string): string[] {
        throw new Error("Method not implemented.");
    }
    public GetChildren(project: string): string[]
    {
        return Array( ...( this.m_projectInfos[ project ].children ) );
    }
    public GetProjects(): ReadonlyArray< ProjectNode >
    {
        return this.m_projectNodes;
    }

    private UpdateProjectInfo( project: string, references: Array< string > ): void
    {
        this.GetOrAddProjectInfo( project );
        for ( const reference of references )
        {
            let infoParent = this.GetOrAddProjectInfo( reference );
            if ( infoParent.children.FirstOrDefault( c => c.toLowerCase() == project.toLowerCase() ) == null )
                infoParent.children.push( project );
        }
    }

    private GetOrAddProjectInfo( projectName: string ): UProjectInfo
    {
        let info = this.m_projectInfos[ projectName ];
        if ( info == null )
        {
            this.m_projectInfos[ projectName ] = {
                children: Array(),
                parents: Array(),
            };
        }
        return info;
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