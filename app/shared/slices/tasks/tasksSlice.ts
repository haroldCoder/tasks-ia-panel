import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TasksState, tasksState } from "../../constants/tasksState";
import { createCachedThunk } from "../cache/createdCachedThunk";
import { deleteTask, getTasksByUser } from "../../utils/requests/tasks.requests";
import { Tasks } from "../../interfaces/tasks";


export const fetchTasks = createCachedThunk({
    typePrefix: 'tasks/fetchTasksUser',
    fetchFunction: (term: string) => getTasksByUser(term),
    cacheKeyGenerator: (term: string) => term
})

export const deleteTaskThunk = createAsyncThunk(
    'tasks/deleteTask', async(id: number) =>{
        try{
            const response = await deleteTask(id);
            if(!response.ok){
                throw new Error("An ocurred error");
            }
        }
        catch(error: any){
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
        .addCase(fetchTasks.fulfilled, (state, action: {payload: Tasks[] | any}) => {
            state.success = true;
            state.loading = false;
            state.data = action.payload.response;
        })
        .addCase(fetchTasks.rejected, (state, action: {payload: string | any}) => {
            state.loading = false;
            state.error = action.payload
        })
        .addCase(deleteTaskThunk.pending, (state: TasksState)=>{
            state.loadingDelete = true;
            state.errorDelete = false;
            state.succesDelete = false;
        })
        .addCase(deleteTaskThunk.rejected, (state: TasksState)=>{
            state.errorDelete = true;
            state.loadingDelete = false;
        })
        .addCase(deleteTaskThunk.fulfilled, (state: TasksState)=>{
            state.succesDelete = true;
            state.loadingDelete = false;
        })
    }

})

export const { actions, reducer } = tasksSlice;
export default tasksSlice.reducer;
