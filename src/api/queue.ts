import { AxiosResponse } from "axios";
import { refreshAuthToken } from "./services/authService";

// auth-queue.ts
let isRefreshing = false;
let refreshPromise: Promise<void> | null = null;
const requestQueue: Array<() => Promise<any>> = [];

export const enqueueRequest = <T>(
  request: () => Promise<AxiosResponse<T>>,
): Promise<AxiosResponse<T>> => {
  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      requestQueue.push(() => request().then(resolve).catch(reject));
    });
  }
  return request();
};

export const startRefresh = () => {
  if (!isRefreshing) {
    isRefreshing = true;
    refreshPromise = refreshAuthToken()
      .then((response) => {
        // Сохраняем новые токены
        localStorage.setItem("accessToken", response.access_token);
        localStorage.setItem("refreshToken", response.refresh_token);
        localStorage.setItem("name", response.name);
        localStorage.setItem("role", response.role);
        localStorage.setItem(
          "isChangedPassword",
          String(response.is_changed_password),
        );
        localStorage.setItem("isAuthenticated", String(true));
        return response;
      })
      .finally(() => {
        isRefreshing = false;
        refreshPromise = null;
        // Выполняем все ожидающие запросы
        while (requestQueue.length) {
          const req = requestQueue.shift();
          req?.();
        }
      });
  }
  return refreshPromise;
};
