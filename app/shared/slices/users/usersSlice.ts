import { createSlice } from "@reduxjs/toolkit";
import { usersState } from "../../constants/users";
import { verifyUser } from "../../utils/requests/users.requests";
import { createCachedThunk } from "../cache/createdCachedThunk";

export const fetchUserThunk = createCachedThunk({
    typePrefix: 'users/fetchUser', 
    fetchFunction: ({term}: {term: string}) => verifyUser(term), 
    cacheKeyGenerator: ({term, forceRefresh = false}: {term: string, forceRefresh?: boolean}) => term});

const userSlice = createSlice({
  name: "users",
  initialState: usersState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserThunk.pending, (state) => {
        state.loading = true;
        state.success = null;
        state.error = null;
      })
      .addCase(fetchUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.data = action.payload;
      })
      .addCase(fetchUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.error.message || 'Failed to fetch user';
      });
  },
});

export const { actions, reducer } = userSlice;
export default userSlice.reducer;