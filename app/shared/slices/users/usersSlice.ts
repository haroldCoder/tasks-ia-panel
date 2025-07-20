import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { usersState } from "../../constants/users";
import { patchUser, verifyUser } from "../../utils/requests/users.requests";
import { createCachedThunk } from "../cache/createdCachedThunk";
import { toastError, toastSuccess } from "../../thunks/toasts";
import { updateUserData } from "../../interfaces/updateUserData";

export const fetchUserThunk = createCachedThunk({
    typePrefix: 'users/fetchUser', 
    fetchFunction: ({term}: {term: string}) => verifyUser(term), 
    cacheKeyGenerator: ({term, forceRefresh = false}: {term: string, forceRefresh?: boolean}) => term});

export const updateDataUserThunk = createAsyncThunk(
  'users/updateUser',
  async({term, userData}: {term: string, userData: updateUserData}, {dispatch}) =>{
    try{
      const response = await patchUser(term, userData);
      if(!response.ok){
        dispatch(toastError("An ocurred error updte data user"))
      }

      dispatch(toastSuccess("data user update successfully"))
    }
    catch(err){
      console.log(err);
    }
})

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
      })
      .addCase(updateDataUserThunk.rejected, (state)=>{
        state.loadingUpdate = false
      })
      .addCase(updateDataUserThunk.fulfilled, (state)=>{
        state.loadingUpdate = false
        state.successUpdate = true
      })
      .addCase(updateDataUserThunk.pending, (state)=>{
        state.loadingUpdate = true
      })
  },
});

export const { actions, reducer } = userSlice;
export default userSlice.reducer;