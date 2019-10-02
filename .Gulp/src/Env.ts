
import * as path from "path";
import * as fs from "fs";
import { CArgumnetsCollection, IArgumentCollection } from "./Arguments";
import { DeleteFolder } from "./Clean";


export enum UCompilePlatform
{
    Browser = "browser",
    NodeJS = "nodejs"
};


export interface ICompileOptions
{
    readonly Out: string;
    readonly Projects: ReadonlyArray< string >;
    // readonly module: "amd" | "system";
    // readonly mergeOneFile: boolean;
    readonly Watch: boolean;
    readonly Platform: UCompilePlatform;
}

export interface IEnvs
{
    readonly DirBin: string;
    readonly DirWorkspace: string;
    readonly DirDist: string;
    readonly CompileOptions: ICompileOptions;
    Cleanup(): void;
}



class CCompileOptions implements ICompileOptions
{
    private m_out: string = null;
    private m_projects: string[] = null;
    private m_watch: boolean = false;
    private m_platform: UCompilePlatform = null;

    public constructor( argvCollection: IArgumentCollection )
    {
        this.m_out = argvCollection.FindStrings( "out", true ).firstOrDefault();
        this.m_projects = argvCollection.FindStrings( "project", false );
        this.m_watch = argvCollection.FindBoolean( "watch" );
        this.m_platform = <any>argvCollection.FindStrings( "platform", false ).firstOrDefault();
        if ( this.m_platform == null )
        {
            this.m_platform = UCompilePlatform.NodeJS;
        }
        this.m_platform = <any>this.m_platform.toLowerCase();
    }

    public get Out(): string
    {
        return this.m_out;
    }

    public get Projects(): ReadonlyArray< string >
    {
        return this.m_projects;
    }

    public get Watch(): boolean
    {
        return this.m_watch;
    }

    public get Platform(): UCompilePlatform
    {
        return this.m_platform;
    }

    public toString(): string
    {
        let options: ICompileOptions =
        {
            Out: this.Out,
            Projects: this.Projects,
            Watch: this.Watch,
            Platform: this.Platform
        };
        return JSON.stringify( options, null, 4 );
    }
}



class CEnvs implements IEnvs
{
    private m_dirWorkspace: string = null;
    private m_dirBin: string = null;
    private m_dirDist: string = null;
    private m_compileOptions: ICompileOptions = null;

    public constructor( compileOptions: ICompileOptions )
    {
        this.m_compileOptions = compileOptions;
        this.m_dirWorkspace = path.resolve( "../" );
        this.m_dirDist = path.resolve( this.m_compileOptions.Out, this.m_compileOptions.Platform.toLowerCase() );
        this.m_dirBin = path.resolve( this.m_compileOptions.Out, "temp" );
    }

    public get DirBin(): string
    {
        return this.m_dirBin;
    }

    public get DirWorkspace(): string
    {
        return this.m_dirWorkspace;
    }

    public get DirDist(): string
    {
        return this.m_dirDist;
    }

    public get CompileOptions(): ICompileOptions
    {
        return this.m_compileOptions;
    }

    public Cleanup(): void
    {
        if ( fs.existsSync( this.m_dirDist ) )
            DeleteFolder( this.m_dirDist );
        if ( fs.existsSync( this.m_dirBin ) )
            DeleteFolder( this.m_dirBin );
    }

    public toString(): string
    {
        let env = {
            DirBin: this.DirBin,
            DirDist: this.DirDist,
            DirWorkspace: this.DirWorkspace,
        };
        return JSON.stringify( env, null, 4 );
    }
}


export function BuildEnvs(): IEnvs
{
    let argvCollection = new CArgumnetsCollection( process.argv );
    let compileOptions = new CCompileOptions( argvCollection );
    let envs = new CEnvs( compileOptions );
    return envs;
}

