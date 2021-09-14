import { createSlice } from "@reduxjs/toolkit";
import { getUserAccounts } from "./user.action";

const initialState: NSUser.State = {
  getUserAccountsStatus: "idle",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get User Accounts
    builder.addCase(getUserAccounts.pending, (state) => {
      state.getUserAccountsStatus = "pending";
    });
    builder.addCase(getUserAccounts.fulfilled, (state, { payload }) => {
      state.getUserAccountsStatus = "success";
      state.accounts = {
        data: payload,
      };
    });
    builder.addCase(getUserAccounts.rejected, (state, { payload }) => {
      state.getUserAccountsStatus = "failed";
      state.error = payload;
    });
  },
});

export default userSlice.reducer;
