import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { googleCalendarState } from "../../constants/googleCalendar";
import { addEventToCalendar, deleteEventRequest, getEventCalendar, getEventsFromCalendar, patchEvent, searchEventFromCalendar } from "../../utils/requests/googleCalendar.requests";
import { GoogleCalendar } from "../../interfaces/googleCalendar";
import { toastError, toastSuccess } from "../../thunks/toasts";
import { createCachedThunk } from "../cache/createdCachedThunk";
import { calendar_v3 } from "googleapis";
import { PatchGoogleCalendar } from "../../interfaces/patchGoogleCalendar";

export const createEventOnCalendar = createAsyncThunk(
    "googleCalendar/createEventOnCalendar",
    async ({ id_user, email, event }: { id_user: string, email: string, event: GoogleCalendar }, { rejectWithValue, dispatch }) => {
        try {
            const response = await addEventToCalendar(id_user, email, event);

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
    cacheKeyGenerator: (arg: { id_userclerk: string, event_id: string, forceRefresh?: boolean }) => arg.id_userclerk + arg.event_id + arg.forceRefresh,
    responseType: 'boolean'
})

export const getEventsFromCalendarTunk = createCachedThunk({
    typePrefix: "googleCalendar/getEventsFromCalendar",
    fetchFunction: ({ id_userclerk }: { id_userclerk: string }) => getEventsFromCalendar(id_userclerk),
    cacheKeyGenerator: (arg: { id_userclerk: string, forceRefresh: boolean | null }) => JSON.stringify({ id_userclerk: arg.id_userclerk, forceRefresh: arg.forceRefresh }),
    responseType: 'data'
})

export const deleteEventTunk = createAsyncThunk(
    "googleCalendar/deleteEvent",
    async ({ id_user, event_id }: { id_user: string, event_id: string },
        { rejectWithValue, dispatch, getState }) => {
        try {
            const { setDeleteSuccess } = googleCalendarSlice.actions;
            const response = await deleteEventRequest(id_user, event_id);
            if (!response) {
                return rejectWithValue("Error deleting event on calendar")
            }

            const calendar = getState() as {googleCalendar: typeof googleCalendarState}
            const newDeleteEvents = [...(calendar.googleCalendar.successDelete?.eventsid || []), event_id];

            dispatch(setDeleteSuccess({
                status: true,
                eventsid: newDeleteEvents
            }))
            dispatch(toastSuccess("Event deleted from Google Calendar successfuly"))
        }
        catch (err) {
            dispatch(toastError("An ocurred error"))
            return rejectWithValue("Error deleting event on calendar");
        }
    }
)

export const getEventCalendarTunk = createCachedThunk({
    typePrefix: "googleCalendar/getEvent",
    fetchFunction: ({id_user, event_id}) => getEventCalendar(id_user, event_id),
    cacheKeyGenerator: (arg: {id_user: string, event_id: string, forceRefresh: boolean | null}) => arg.id_user+ arg.event_id + arg.forceRefresh,
    responseType: 'data'
})

export const patchEventTunk = createAsyncThunk(
    "googleCalendar/patchEvent",
    async (
        { id_user, event_id, data }:
            { id_user: string, event_id: string, data: PatchGoogleCalendar },
        { dispatch, rejectWithValue }) => {
        try {
            const response = await patchEvent(id_user, event_id, data);

            if (!response) {
                dispatch(toastError("An ocurred error update event"))
            }

            dispatch(toastSuccess("Event update successfully"))
        }
        catch (err) {
            dispatch(toastError("An ocurred error update event"))
            return err;
        }
    }
)

const googleCalendarSlice = createSlice({
    name: "googleCalendar",
    initialState: googleCalendarState,
    reducers: {
        setDeleteSuccess: (state, action: {payload: {status: boolean, eventsid: Array<string>}}) =>{
            state.successDelete = action.payload
        }
    },
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
                if (action.payload) {
                    state.successSearch = true;
                } else {
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
            .addCase(getEventsFromCalendarTunk.fulfilled, (state, action: { payload: any }) => {
                state.loadingGet = false;
                state.successGet = true;
                state.dataGet = action.payload;
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
            .addCase(deleteEventTunk.fulfilled, (state, action: { payload: any }) => {
                state.loadingDelete = false;
            })
            .addCase(deleteEventTunk.rejected, (state, action: { payload: any }) => {
                state.loadingDelete = false;
            })
            .addCase(deleteEventTunk.pending, (state, action) => {
                state.loadingDelete = true;
            })
            .addCase(getEventCalendarTunk.pending, (state) => {
                state.loadingGetEvt = true;
                state.dataGetEvt = null;
            })
            .addCase(getEventCalendarTunk.fulfilled, (state, action: { payload: calendar_v3.Schema$Event | any }) => {
                state.loadingGetEvt = false;
                state.dataGetEvt = action.payload;
            })
            .addCase(getEventCalendarTunk.rejected, (state) => {
                state.loadingGetEvt = false;
            })
            .addCase(patchEventTunk.pending, (state) => {
                state.loadingPatch = true;
                state.successPatch = false;
            })
            .addCase(patchEventTunk.fulfilled, (state) => {
                state.loadingPatch = false;
                state.successPatch = true;
            })
            .addCase(patchEventTunk.rejected, (state) => {
                state.loadingPatch = false;
                state.successPatch = false;
            })
    },
})

export default googleCalendarSlice.reducer;
export const { setDeleteSuccess } = googleCalendarSlice.actions;
