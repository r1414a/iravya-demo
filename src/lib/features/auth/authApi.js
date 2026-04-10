import { api } from "../api";
import { clearUser } from "./authSlice";

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        signIn: builder.mutation({
            query: (credentials) => ({
                url: "/api/v1/users/signin",
                method: "POST",
                body: credentials,
            }),
            invalidatesTags: ['Auth']
        }),
        getMe: builder.query({
            query: () => ({
                url: "/api/v1/users/me",
                skipToast: true
            }),
            providesTags: ['Auth']
        }),
        signOut: builder.mutation({
            query: () => ({
                url: "/api/v1/users/signout",
                method: "POST"
            }),
            invalidatesTags: ['Auth'],
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(clearUser());
                    // dispatch(api.util.resetApiState());
                } catch (error) {
                    console.error("Logout failed:", error);
                }
            },
            
        }),

        //login,getMe,logout
    })
})

export const {
    useSignInMutation,
    useGetMeQuery,
    useSignOutMutation
} = authApi