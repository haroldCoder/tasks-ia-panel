import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { googleCalendarState } from "../../constants/googleCalendar";
import { addEventToCalendar } from "../../utils/requests/googleCalendar.requests";
import { GoogleCalendar } from "../../interfaces/googleCalendar";

export const createEventOnCalendar = createAsyncThunk(
    "googleCalendar/createEventOnCalendar",
    async ({ id_user, email, event }: { id_user: string, email: string, event: GoogleCalendar }, { rejectWithValue }) => {
        try {
            const response = await addEventToCalendar(id_user, email, event);

            console.log(response);
            

            if (!response) {
                return rejectWithValue("Error creating event on calendar");
            }
            return response;
        }
        catch (error) {
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
            state.loading = false;
            state.success = true;
        })
            .addCase(createEventOnCalendar.rejected, (state, action: { payload: any }) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createEventOnCalendar.pending, (state, action) => {
                state.loading = true;
                state.success = false;
                state.error = null;
            })
    },
})

export default googleCalendarSlice.reducer;
