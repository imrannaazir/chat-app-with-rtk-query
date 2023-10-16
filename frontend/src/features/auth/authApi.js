import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // endpoint will be here

        // end point for register of a user
        register: builder.mutation({
            query: (data) => ({
                url: "/auth/register",
                method: "POST",
                body: data,
            }),
            // onQueryStarted func is called after request 
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;

                    console.log(result, "hhhhhh");
                    // if query if fulfilled update the local storage
                    localStorage.setItem("auth", JSON.stringify({
                        accessToken: result.data.data.accessToken,
                        user: result.data.data.user,
                    }));

                    // also dispatch login reducer to update state
                    dispatch(userLoggedIn({
                        accessToken: result.data.data.accessToken,
                        user: result.data.data.user,
                    }));
                } catch (error) {
                    // do nothing.. if any error handle on  ui
                }
            }
        }),

        // endpoint for login a user
        login: builder.mutation({
            query: (data) => ({
                url: "/auth/login",
                method: "POST",
                body: data,
            }),
            // onQueryStarted func is called after request 
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    // if query if fulfilled update the local storage
                    localStorage.setItem("auth", JSON.stringify({
                        accessToken: result.data.accessToken,
                        user: result.data.user,
                    }));

                    // also dispatch login reducer to update state
                    dispatch(userLoggedIn({
                        accessToken: result.data.accessToken,
                        user: result.data.user,
                    }));
                } catch (error) {
                    // do nothing.. if any error handle on  ui
                }
            }
        }),
    }),
});

// export hooks
export const { useLoginMutation, useRegisterMutation } = authApi;