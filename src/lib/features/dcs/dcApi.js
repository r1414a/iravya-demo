import { api } from "../api"
 
export const dcApi = api.injectEndpoints({
    endpoints: (builder) => ({
 
        // GET /dc?page=1&limit=10&search=&dc_status=
        getAllDcs: builder.query({
            query: ({ page = 1, limit = 10, search = "", dc_status = "" } = {}) => {
                const params = new URLSearchParams()
                params.set("page",  page)
                params.set("limit", limit)
                if (search)    params.set("search",    search)
                if (dc_status) params.set("dc_status", dc_status)
                return {
                    url: `/api/v1/dc/dc?${params.toString()}`,
                    skipToast: true,
                }
            },
            providesTags: ["DCs"],
        }),
 
        // GET /getDc/:id
        getDc: builder.query({
            query: (id) => ({
                url: `/api/v1/dc/getDc/${id}`,
                skipToast: true,
            }),
            providesTags: (_result, _err, id) => [{ type: "DCs", id }],
        }),
 
        // POST /addDc
        addDc: builder.mutation({
            query: (body) => ({
                url: "/api/v1/dc/addDc",
                method: "POST",
                body,
            }),
            invalidatesTags: ["DCs"],
        }),
 
        // PUT /updatDc/:id  (note: your route has a typo "updatDc" — keeping it to match)
        updateDc: builder.mutation({
            query: ({ id, ...body }) => ({
                url: `/api/v1/dc/updatDc/${id}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: (_result, _err, { id }) => ["DCs", { type: "DCs", id }],
        }),
 
        // DELETE /deleteDc/:id
        deleteDc: builder.mutation({
            query: (id) => ({
                url: `/api/v1/dc/deleteDc/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["DCs"],
        }),
    }),
})
 
export const {
    useGetAllDcsQuery,
    useGetDcQuery,
    useAddDcMutation,
    useUpdateDcMutation,
    useDeleteDcMutation,
} = dcApi
 