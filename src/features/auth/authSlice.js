import { createSlice } from "@reduxjs/toolkit";

// initial value fro auth slice
const initialValue = {
    accessToken: undefined,
    user: undefined,
};

// create auth slice
const authSlice = createSlice({
    name: "auth",
    initialValue,
    reducers: {
        // reducer for login
        userLoggedIn: (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.user = action.payload.user;
        },

        // reducer for log out
        userLoggedOut: (state, action) => {
            state.accessToken = undefined;
            state.user = undefined;
        }
    }
});

// export actions
export const { userLoggedIn, userLoggedOut } = authSlice.actions;

// export reducer
export default authSlice.reducer;
