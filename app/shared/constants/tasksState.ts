import { Tasks } from "../interfaces/tasks"

interface TasksState{
    loading: boolean,
    error: string | null,
    data: Array<Tasks>,
    success: boolean | null
}

export const tasksState: TasksState = {
    loading: false,
    error: null,
    data: [],
    success: null
}