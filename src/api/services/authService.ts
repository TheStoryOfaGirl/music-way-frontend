import {
  AuthTokens,
  ChangePasswordData,
  LoginData,
  RegisterData,
  UserRole,
} from "@models";
import { api } from "./../../api/api.ts";
import axios from "axios";
import { enqueueRequest, startRefresh } from "./../../api/queue.ts";

export const authApi = {
  register: (data: RegisterData) => api.post("/auth/register", data),
  login: (data: LoginData) =>
    api.postForm<
      AuthTokens & {
        role: UserRole;
        name: string;
        is_changed_password: boolean;
      }
    >("/auth/login", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  changePassword: (data: ChangePasswordData) =>
    api.patch("/auth/change-password", data),
  refreshToken: (refreshToken: string) =>
    api.post<
      AuthTokens & {
        role: UserRole;
        name: string;
        is_changed_password: boolean;
      }
    >("/auth/refresh", {
      refresh_token: refreshToken,
    }),
  logout: () => api.delete("/auth/logout"),
  checkAuth: () => api.get("/auth/login"),
};

export const refreshAuthToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) throw new Error("No refresh token");
  const { data } = await axios.post(
    `${import.meta.env.VITE_API_URL}auth/refresh`,
    { refresh_token: refreshToken },
  );
  return data;
};

export const logout = async () => {
  if (!localStorage.getItem("accessToken")) {
    await startRefresh();
  }
  return enqueueRequest(() => api.delete("/auth/logout"));
};
