import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "../shared/slices/users/usersSlice";
import cacheSlice from "../shared/slices/cache/cacheSlice";

export const store = configureStore({
    reducer: {
        users: usersSlice,
        cache: cacheSlice
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;