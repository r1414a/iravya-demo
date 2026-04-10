import { api } from "../api"
 
export const truckApi = api.injectEndpoints({
    endpoints: (builder) => ({
 
        // GET /truck?type=&status=&search=&page=1&limit=10
        getAllTrucks: builder.query({
            query: ({ type = "", status = "", search = "", page = 1, limit = 10 } = {}) => {
                const params = new URLSearchParams()
                if (type)   params.set("type",   type)
                if (status) params.set("status", status)
                if (search) params.set("search", search)
                params.set("page",  page)
                params.set("limit", limit)
                return {
                    url: `/api/v1/trucks/truck?${params.toString()}`,
                    skipToast: true,
                }
            },
            providesTags: ["Trucks"],
        }),
 
        // GET /truck/:id
        getTruck: builder.query({
            query: (id) => ({
                url: `/api/v1/trucks/truck/${id}`,
                skipToast: true,
            }),
            providesTags: (_result, _err, id) => [{ type: "Trucks", id }],
        }),
 
        // POST /add-truck  — multipart/form-data (files included)
        addTruck: builder.mutation({
            query: (formData) => ({
                url: "/api/v1/trucks/add-truck",
                method: "POST",
                body: formData,
                // Don't set Content-Type — browser sets it with boundary for FormData
            }),
            invalidatesTags: ["Trucks"],
        }),
 
        // PUT /updatetruck/:id  — multipart/form-data
        updateTruck: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/api/v1/trucks/updatetruck/${id}`,
                method: "PUT",
                body: formData,
            }),
            invalidatesTags: (_result, _err, { id }) => ["Trucks", { type: "Trucks", id }],
        }),
 
        // DELETE /truck/delete/:id
        deleteTruck: builder.mutation({
            query: (id) => ({
                url: `/api/v1/trucks/truck/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Trucks"],
        }),
 
        // POST /trip-data  body: { trip_id }
        getTruckRecentTrip: builder.query({
            query: (trip_id) => ({
                url: "/api/v1/trucks/trip-data",
                method: "POST",
                body: { trip_id },
                skipToast: true,
            }),
            providesTags: (_result, _err, trip_id) => [{ type: "TruckTrip", id: trip_id }],
        }),
 
        // GET /trip-history/:id
        getTruckTripHistory: builder.query({
            query: (id) => ({
                url: `/api/v1/trucks/trip-history/${id}`,
                skipToast: true,
            }),
            providesTags: (_result, _err, id) => [{ type: "TruckHistory", id }],
        }),
    }),
})
 
export const {
    useGetAllTrucksQuery,
    useGetTruckQuery,
    useAddTruckMutation,
    useUpdateTruckMutation,
    useDeleteTruckMutation,
    useGetTruckRecentTripQuery,
    useGetTruckTripHistoryQuery,
} = truckApi