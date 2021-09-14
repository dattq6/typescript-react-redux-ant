import { createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../services";

export const getUserAccounts = createAsyncThunk<any, { userId: string }, ThunkRejectType>(
  "user/getUserAccounts",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await apiService("getUserAccounts", [payload.userId])();
      return response?.data;
    } catch (error) {
      return rejectWithValue(error as ApiResponseError);
    }
  }
);
