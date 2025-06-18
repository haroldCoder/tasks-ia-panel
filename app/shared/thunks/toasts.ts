import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const toastSuccess = createAsyncThunk(
    'toast/success',
    (msg: string) => {
        toast.success(msg);
    }
);

export const toastError = createAsyncThunk(
    'toast/error',
    (msg: string) => {
        toast.error(msg);
    }
);