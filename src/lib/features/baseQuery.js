import { fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { showErrorToast } from "../utils/showErrorToast";
import { showSuccessToast } from "../utils/showSuccessToast";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BACKEND_DEV,
  credentials: "include"

})

export const baseQueryWithToast = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  const skipToast = args?.skipToast
  //   console.log("result", result);

  if (result.error) {
//&& result.error.status !== 401
    if (!skipToast) {
      showErrorToast(result.error)
    }

  } else {

    if (!skipToast && result.data?.message) {
      showSuccessToast(result.data.message)
    }

  }
  return result;
};