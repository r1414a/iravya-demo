import { api } from "../api";
 
export const driverApi = api.injectEndpoints({
    endpoints: (builder) => ({
 
        // GET /getAllDriverList?page=1&limit=10
        getAllDrivers: builder.query({
            query: ({ page = 1, limit = 10 } = {}) => ({
                url: `/api/v1/drivers/getAllDriverList?page=${page}&limit=${limit}`,
                skipToast: true,
            }),
            providesTags: ["Drivers"],
        }),
 
        // POST /getAllDriverListBySearch  body: { search }  query: page, limit
        searchDrivers: builder.query({
            query: ({ page = 1, limit = 10, search = "" } = {}) => ({
                url: `/api/v1/drivers/getAllDriverListBySearch?page=${page}&limit=${limit}`,
                method: "POST",
                body: { search },
                skipToast: true,
            }),
            providesTags: ["Drivers"],
        }),
 
        // GET /getDriver/:id
        getDriver: builder.query({
            query: (id) => ({
                url: `/api/v1/drivers/getDriver/${id}`,
                skipToast: true,
            }),
            providesTags: (_result, _err, id) => [{ type: "Drivers", id }],
        }),
 
        // POST /addDriver
        addDriver: builder.mutation({
            query: (body) => ({
                url: "/api/v1/drivers/addDriver",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Drivers"],
        }),
 
        // PUT /updateDriver/:id
        updateDriver: builder.mutation({
            query: ({ id, ...body }) => ({
                url: `/api/v1/drivers/updateDriver/${id}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: (_result, _err, { id }) => ["Drivers", { type: "Drivers", id }],
        }),
 
        // DELETE /deleteDriver/:id
        deleteDriver: builder.mutation({
            query: (id) => ({
                url: `/api/v1/drivers/deleteDriver/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Drivers"],
        }),
 
        // GET /viewCurrentTripdetails/:id
        getDriverCurrentTrip: builder.query({
            query: (id) => ({
                url: `/api/v1/drivers/viewCurrentTripdetails/${id}`,
                skipToast: true,
            }),
            providesTags: (_result, _err, id) => [{ type: "DriverTrip", id }],
        }),
 
        // GET /getDriverTripHistory/:id
        getDriverTripHistory: builder.query({
            query: (id) => ({
                url: `/api/v1/drivers/getDriverTripHistory/${id}`,
                skipToast: true,
            }),
            providesTags: (_result, _err, id) => [{ type: "DriverHistory", id }],
        }),
    }),
});
 
export const {
    useGetAllDriversQuery,
    useSearchDriversQuery,
    useGetDriverQuery,
    useAddDriverMutation,
    useUpdateDriverMutation,
    useDeleteDriverMutation,
    useGetDriverCurrentTripQuery,
    useGetDriverTripHistoryQuery,
} = driverApi;