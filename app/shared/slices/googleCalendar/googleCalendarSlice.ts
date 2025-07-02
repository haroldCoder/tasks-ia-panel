import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { googleCalendarState } from "../../constants/googleCalendar";
import { addEventToCalendar, getEventsFromCalendar, searchEventFromCalendar } from "../../utils/requests/googleCalendar.requests";
import { GoogleCalendar } from "../../interfaces/googleCalendar";
import { toastError, toastSuccess } from "../../thunks/toasts";
import { createCachedThunk } from "../cache/createdCachedThunk";

export const createEventOnCalendar = createAsyncThunk(
    "googleCalendar/createEventOnCalendar",
    async ({ id_user, email, event }: { id_user: string, email: string, event: GoogleCalendar }, { rejectWithValue, dispatch }) => {
        try {
            const response = await addEventToCalendar(id_user, email, event);

            console.log(response);


            if (!response) {
                return rejectWithValue("Error creating event on calendar");
            }

            dispatch(toastSuccess("Event updload to Google Calendar successfuly"))
            return response;
        }
        catch (error) {
            dispatch(toastError("An ocurred error"))
            return rejectWithValue("Error creating event on calendar");
        }
    }

)

export const searchEventOnCalendarTunk = createCachedThunk({
    typePrefix: "googleCalendar/searchEventOnCalendar",
    fetchFunction: ({ id_userclerk, event_id }: { id_userclerk: string, event_id: string }) => searchEventFromCalendar(id_userclerk, event_id),
    cacheKeyGenerator: (arg: { id_userclerk: string, event_id: string }) => arg.id_userclerk + arg.event_id,
    responseType: 'boolean'
})

export const getEventsFromCalendarTunk = createCachedThunk({
    typePrefix: "googleCalendar/getEventsFromCalendar",
    fetchFunction: ({ id_userclerk }: { id_userclerk: string }) => getEventsFromCalendar(id_userclerk),
    cacheKeyGenerator: (arg: { id_userclerk: string }) => arg.id_userclerk,
})

const googleCalendarSlice = createSlice({
    name: "googleCalendar",
    initialState: googleCalendarState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(createEventOnCalendar.fulfilled, (state, action) => {
            state.loadingCreate = false;
            state.successCreate = true;
        })
            .addCase(createEventOnCalendar.rejected, (state, action: { payload: any }) => {
                state.loadingCreate = false;
                state.errorCreate = action.payload;
            })
            .addCase(createEventOnCalendar.pending, (state, action) => {
                state.loadingCreate = true;
                state.successCreate = false;
                state.errorCreate = null;
            })
            .addCase(searchEventOnCalendarTunk.fulfilled, (state, action) => {
                state.loadingSearch = false;
                if(action.payload){
                    state.successSearch = true;
                }else{
                    state.successSearch = false;
                }
            })
            .addCase(searchEventOnCalendarTunk.rejected, (state, action: { payload: any }) => {
                state.loadingSearch = false;
                state.errorSearch = action.payload;
                
            })
            .addCase(searchEventOnCalendarTunk.pending, (state, action) => {
                state.loadingSearch = true;
                state.successSearch = false;
                state.errorSearch = null;             
            })
            .addCase(getEventsFromCalendarTunk.fulfilled, (state, action) => {
                state.loadingGet = false;
                state.successGet = true;
            })
            .addCase(getEventsFromCalendarTunk.rejected, (state, action: { payload: any }) => {
                state.loadingGet = false;
                state.errorGet = action.payload;
            })
            .addCase(getEventsFromCalendarTunk.pending, (state, action) => {
                state.loadingGet = true;
                state.successGet = false;
                state.errorGet = null;
            })
    },
})

export default googleCalendarSlice.reducer;
