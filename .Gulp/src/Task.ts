

import * as Gulp from "gulp";
import * as Undertaker from "undertaker";

export class CTaskNode
{
    private readonly m_name: string = null;

    private readonly m_task: Undertaker.TaskFunction = null;

    public constructor( name: string, task: Undertaker.TaskFunction )
    {
        this.m_name = name;
        this.m_task = task;
    }

    public get Name(): string
    {
        return this.m_name;
    }

    public Init(): void
    {
        Gulp.task( this.m_name, this.m_task );
    }
}


export function GetTaskNames( taskNodes: ReadonlyArray< CTaskNode > ): string[]
{
    let taskNames: string[] = [];
    for ( const tn of taskNodes )
    {
        taskNames.push( tn.Name );
    }
    return taskNames;
}
