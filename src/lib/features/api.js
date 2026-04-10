import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { baseQueryWithToast } from "./baseQuery"

export const api = createApi({
    reducerPath: "api",
    baseQuery: baseQueryWithToast,
    tagTypes: ['Auth', 'Drivers', 'DriverTrip', 'DriverHistory', "Trucks", "TruckTrip", "TruckHistory",'DCs'],
    endpoints: () => ({})
})