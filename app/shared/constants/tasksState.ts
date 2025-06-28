import { Tasks } from "../interfaces/tasks"

export interface TasksState {
    loading: boolean,
    error: string | null,
    data: Array<Tasks>,
    success: boolean | null,
    errorDelete: boolean,
    succesDelete: boolean,
    loadingDelete: boolean,
    loadingUpdate: boolean,
    errorUpdate: boolean,
    succesUpdate: boolean,
    loadingAssignAditional: boolean,
    task: { title: Tasks["title"], description: Tasks["description"] },
    loadingTask: boolean,
    errorTask: string | null,
}

export const tasksState: TasksState = {
    loading: false,
    error: null,
    data: [],
    success: null,
    errorDelete: false,
    succesDelete: false,
    loadingDelete: false,
    loadingUpdate: false,
    errorUpdate: false,
    succesUpdate: false,
    loadingAssignAditional: false,
    task: { title: "", description: "" },
    loadingTask: false,
    errorTask: null,
}