import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TasksState, tasksState } from "../../constants/tasksState";
import { createCachedThunk } from "../cache/createdCachedThunk";
import { assignAditionalTask, deleteTask, getTasksByUser, updateTask } from "../../utils/requests/tasks.requests";
import { Tasks } from "../../interfaces/tasks";
import { TaskUpdate } from "../../interfaces/taskUpdate";
import { toastError, toastSuccess } from "../../thunks/toasts";
import { TaskAditional } from "../../interfaces/taskAditional";


export const fetchTasks = createCachedThunk({
    typePrefix: 'tasks/fetchTasksUser',
    fetchFunction: (term: string) => getTasksByUser(term),
    cacheKeyGenerator: (term: string) => term
})

export const deleteTaskThunk = createAsyncThunk(
    'tasks/deleteTask', async (id: number, { dispatch }) => {
        try {
            const response = await deleteTask(id);
            if (!response.ok) {
                throw new Error("An ocurred error");
            }
            dispatch(toastSuccess("Tasks delete successfully"));
        }
        catch (error: any) {
            dispatch(toastError("Error deleting tasks"))
            throw new Error(error.message);
        }
    }
)

export const updateTaskThunk = createAsyncThunk(
    'tasks/updateTask', async ({ task, id }: { task: TaskUpdate, id: number }, { dispatch }) => {
        try {
            const response = await updateTask(id, task);

            if (!response.ok) {
                throw new Error("An ocurred error");
            }
            dispatch(toastSuccess("Tasks update successfully"));
        }
        catch (error: any) {
            dispatch(toastError("Error updating tasks"))
            throw new Error(error.message);
        }
    }
)

export const assignAditionalTaskThunk = createAsyncThunk(
    'tasks/assignAditionalTask',
    async ({ id, aditionalId, aditionalData }:
        { id: number, aditionalId?: number, aditionalData: TaskAditional }, { dispatch }) => {
        try {
            const response = await assignAditionalTask(id, aditionalData, aditionalId);
            if (!response.ok) {
                throw new Error("An ocurred error");
            }
            dispatch(toastSuccess("Aditional task assigned successfully"));
        }
        catch (error: any) {
            dispatch(toastError("Error assigning aditional task"))
            throw new Error(error.message);
        }
    }
)


const tasksSlice = createSlice({
    name: 'tasks',
    initialState: tasksState,
    reducers: {},
    extraReducers: (builder: ActionReducerMapBuilder<any>) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTasks.fulfilled, (state, action: { payload: Tasks[] | any }) => {
                state.success = true;
                state.loading = false;
                state.data = action.payload.response;
            })
            .addCase(fetchTasks.rejected, (state, action: { payload: string | any }) => {
                state.loading = false;
                state.error = action.payload
            })
            .addCase(deleteTaskThunk.pending, (state: TasksState) => {
                state.loadingDelete = true;
                state.errorDelete = false;
                state.succesDelete = false;
            })
            .addCase(deleteTaskThunk.rejected, (state: TasksState) => {
                state.errorDelete = true;
                state.loadingDelete = false;
            })
            .addCase(deleteTaskThunk.fulfilled, (state: TasksState) => {
                state.succesDelete = true;
                state.loadingDelete = false;
            })
            .addCase(updateTaskThunk.fulfilled, (state: TasksState) => {
                state.loadingUpdate = false;
                state.succesUpdate = true;
            })
            .addCase(updateTaskThunk.rejected, (state: TasksState) => {
                state.loadingUpdate = false;
                state.errorUpdate = true;
            })
            .addCase(updateTaskThunk.pending, (state: TasksState) => {
                state.loadingUpdate = true;
                state.succesUpdate = false;
                state.errorUpdate = false;
            })
            .addCase(assignAditionalTaskThunk.pending, (state: TasksState) => {
                state.loadingAssignAditional = true;
            })
            .addCase(assignAditionalTaskThunk.fulfilled, (state: TasksState) => {
                state.loadingAssignAditional = false;
            })
            .addCase(assignAditionalTaskThunk.rejected, (state: TasksState) => {
                state.loadingAssignAditional = false;
            })
    }

})

export const { actions, reducer } = tasksSlice;
export default tasksSlice.reducer;
