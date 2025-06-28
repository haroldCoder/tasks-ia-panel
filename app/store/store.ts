import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "../shared/slices/users/usersSlice";
import cacheSlice from "../shared/slices/cache/cacheSlice";
import tasksSlice from "../shared/slices/tasks/tasksSlice"
import googleCalendarSlice from "../shared/slices/googleCalendar/googleCalendarSlice"

export const store = configureStore({
    reducer: {
        users: usersSlice,
        cache: cacheSlice,
        tasks: tasksSlice,
        googleCalendar: googleCalendarSlice
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;