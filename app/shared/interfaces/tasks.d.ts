import { TypeLabels } from "../enums/typeLabels.enum"

export interface Tasks{
    id: number,
    title: string,
    description: string,
    priority: number,
    completed: number,
    userId: number,
    task_aditional?: {
        id: number,
        start_date: string,
        end_date: string,
        type: TypeLabels
    }
}