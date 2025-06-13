import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import { tasksState } from "../../constants/tasksState";
import { createCachedThunk } from "../cache/createdCachedThunk";
import { getTasksByUser } from "../../utils/requests/tasks.requests";
import { Tasks } from "../../interfaces/tasks";


export const fetchTasks = createCachedThunk({
    typePrefix: 'tasks/fetchTasksUser',
    fetchFunction: (term: string) => getTasksByUser(term),
    cacheKeyGenerator: (term: string) => term
})


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
    }

})

export const { actions, reducer } = tasksSlice;
export default tasksSlice.reducer;
