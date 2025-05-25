import { useAuthStore } from "@stores";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authApi } from "./../../api/services/authService.ts";
import { useNavigate } from "react-router-dom";
import { URLS } from "@utils";
import { isAxiosError } from "axios";
import { startRefresh } from "./../../api/queue.ts";

export const useLogin = () => {
  const { login } = useAuthStore();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      login(
        data.data.role,
        data.data.name,
        {
          access_token: data.data.access_token,
          refresh_token: data.data.refresh_token,
        },
        data.data.is_changed_password,
      );
      if (data.data.role === "Преподаватель" && data.data.is_changed_password) {
        navigate(URLS.TEACHER.CLASSES, { replace: true });
      } else if (data.data.role === "Ученик") {
        navigate(URLS.STUDENT.HOMEWORKS, { replace: true });
      }
    },
  });
};

export const useRegister = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: authApi.register,
    onSuccess: () => {
      navigate(URLS.AUTH.LOGIN, { replace: true });
    },
  });
};

export const useChangePassword = () => {
  const navigate = useNavigate();
  const { changePassword } = useAuthStore();
  return useMutation({
    mutationFn: authApi.changePassword,
    onSuccess: () => {
      changePassword();
      navigate(URLS.TEACHER.CLASSES, { replace: true });
    },
  });
};

export const useLogout = () => {
  const { logout: logoutStore } = useAuthStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      logoutStore();
      queryClient.clear();
    },
  });
};

export const useCheckAuth = (path: string) => {
  return useQuery({
    queryKey: ["auth-check", path],
    queryFn: async () => {
      try {
        return await authApi.checkAuth();
      } catch (error) {
        if (isAxiosError(error) && error.response?.status === 401) {
          try {
            await startRefresh();
            return authApi.checkAuth();
          } catch (e) {
            localStorage.clear();
            if (window.location.pathname !== "/") window.location.href = "/";
            throw e;
          }
        }
        throw error;
      }
    },
    staleTime: 0,
    retry: false,
  });
};
