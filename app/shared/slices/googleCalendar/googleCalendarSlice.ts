import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { googleCalendarState } from "../../constants/googleCalendar";
import { addEventToCalendar } from "../../utils/requests/googleCalendar.requests";
import { GoogleCalendar } from "../../interfaces/googleCalendar";
import { toastError, toastSuccess } from "../../thunks/toasts";

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
    },
})

export default googleCalendarSlice.reducer;
