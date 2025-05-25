import axios from "axios";
import { enqueueRequest, startRefresh } from "./queue";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      (originalRequest.url.includes("/auth/login") &&
        originalRequest.method?.toLowerCase() === "get") ||
      originalRequest.url.includes("/auth/refresh")
    ) {
      return Promise.reject(error);
    }

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.method?.toLowerCase() !== "get"
    ) {
      originalRequest._retry = true;
      try {
        await startRefresh();
        return enqueueRequest(() => api(originalRequest));
      } catch (e) {
        localStorage.clear();
        if (window.location.pathname !== "/") window.location.href = "/";
        return Promise.reject(e);
      }
    }
    return Promise.reject(error);
  },
);
