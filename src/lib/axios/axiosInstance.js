import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.VITE_BACKEND_DEV,
  timeout: 10000,
});

// Add a request interceptor
// axiosInstance.interceptors.request.use(
//   (config) => {
//     console.log(config);
//     // For example, add an auth token from local storage
//     ;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

axiosInstance.interceptors.response.use(
  (response) => {
    return {
      success: true,
      message: response.data?.message || "Success",
      data: response.data?.data ?? null,
    };
  },
  (error) => {
    // Handle global errors (e.g., redirect to login on 401 error)
     const message =
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong";
    
    return Promise.reject({
      success: false,
      message,
      status: error?.response?.status,
    });
  }
);

export default axiosInstance;
