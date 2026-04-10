import { api } from "../api";

export const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: ({page = 1, limit = 10}) => ({
                url: `/api/v1/users/all_users?page=${page}&limit=${limit}`,
                skipToast: true
            })
        }),
        createUser: builder.mutation({
            query: (formData) => ({
                url: "/api/v1/users/signup",
                method: "POST",
                body: formData
            })
        }),
        updateUser: builder.mutation({
            query: (id,formData) => ({
                url: `/api/v1/users/update_user/${id}`,
                method: "PUT",
                body: formData
            })  
        })
    })
})

export const {
    useGetAllUsersQuery,
    useCreateUserMutation,
    useUpdateUserMutation
} = userApi