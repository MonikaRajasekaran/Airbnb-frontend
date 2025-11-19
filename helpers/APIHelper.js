import { BASE_URL } from "../config/constants";
import axios from "axios";

// Create axios instance instead of modifying default
const axiosInstance = axios.create({
  baseURL: BASE_URL(),
});

// Request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    // Only add token if it exists and not an auth route
    const isAuthRoute = config.url?.includes('/auth/login') || 
                       config.url?.includes('/auth/register');
    
    if (typeof window !== "undefined" && window.localStorage && !isAuthRoute) {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  function (error) {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Don't retry if already retried or not 401
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;
    const refreshToken = localStorage.getItem("refreshToken");
    const username = localStorage.getItem("username");

    if (!refreshToken || !username) {
      // No refresh token, redirect to login
      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("username");
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }

    try {
      const refreshTokenUrl = `${BASE_URL()}/api/v1/users/auth/refresh`;
      const res = await axios.post(refreshTokenUrl, {
        refreshToken,
        username,
      });

      if (res.status === 200) {
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);
        
        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;
        return axiosInstance(originalRequest);
      }
    } catch (refreshError) {
      // Refresh failed, clear storage and redirect
      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("username");
        window.location.href = '/login';
      }
      return Promise.reject(refreshError);
    }

    return Promise.reject(error);
  }
);

const helpers = {
  callApi: function (method, path, data = {}, headers = {}, url = BASE_URL()) {
    const callUrl = url + path;

    return axiosInstance({
      method: method,
      url: callUrl,
      data: data,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    })
    .then(response => {
      // Return the data directly for easier handling
      return response.data;
    })
    .catch(error => {
      // Enhanced error handling
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          error.message || 
                          'Request failed';
      throw new Error(errorMessage);
    });
  },
};

export default helpers;