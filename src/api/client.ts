/** @format */

import axios from "axios";
import { BASE_URL } from "@/constants/endpoints";

export const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add response interceptor for global error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log structured error information
    if (error.response) {
      // Server responded with error status
      console.error("API Error:", {
        status: error.response.status,
        message: error.response.data?.message || error.message,
        endpoint: error.config?.url,
      });

      // Handle specific status codes
      if (error.response.status === 401) {
        // Handle unauthorized - could redirect to login
        console.warn("Unauthorized access - authentication required");
      } else if (error.response.status === 403) {
        console.warn("Forbidden - insufficient permissions");
      } else if (error.response.status >= 500) {
        console.error("Server error - please try again later");
      }
    } else if (error.request) {
      // Request made but no response received
      console.error("Network Error:", {
        message: "No response from server",
        endpoint: error.config?.url,
      });
    } else {
      // Error setting up request
      console.error("Request Error:", error.message);
    }

    return Promise.reject(error);
  }
);