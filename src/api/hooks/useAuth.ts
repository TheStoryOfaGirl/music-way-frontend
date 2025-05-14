import { UserRole } from "@models";
import { useAuthStore } from "@stores";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  authApi,
  logout,
  refreshAuthToken,
} from "./../../api/services/authService.ts";
import { replace, useNavigate } from "react-router-dom";
import { URLS } from "@utils";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import { useEffect } from "react";
import { api } from "./../../api/api.ts";
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

// export const useLogout = () => {
//   const { logout: logoutStore } = useAuthStore();
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: authApi.logout,
//     onSuccess: () => {
//       logoutStore();
//       queryClient.clear();
//     },
//     onError: async (error) => {
//       if (isAxiosError(error) && error.response?.status === 401) {
//         try {
//           // Начинаем обновление токена
//           await startRefresh()?.then(() => {
//             authApi.logout();
//             logoutStore();
//           });
//           // Повторяем проверку с новым токеном
//         } catch (e) {
//           localStorage.clear();
//           if (window.location.pathname !== "/") window.location.href = "/";
//           throw e;
//         }
//       }
//       throw error;
//     },
//   });
// };

// export const useCheckAuth = () => {
//   return useQuery({
//     queryKey: ["auth"],
//     queryFn: authApi.checkAuth,
//     retry: false
//   });

// export const useCheckAuth = () => {
//   return useQuery({
//     queryKey: ["auth"],
//     queryFn: () => authApi.checkAuth().catch((e) => {
//       if (e.response?.status === 401 && window.location.pathname !== '/') {
//         localStorage.clear();
//         window.location.href = "/";
//       }
//       throw e;
//     }),
//     retry: false,
//     refetchOnWindowFocus: false,
//   });
// };

// features/auth/lib/useAuth.ts
export const useCheckAuth = (path: string) => {
  console.log("зашел");
  return useQuery({
    queryKey: ["auth-check", path],
    queryFn: async () => {
      try {
        // Пытаемся проверить авторизацию
        return await authApi.checkAuth();
      } catch (error) {
        if (isAxiosError(error) && error.response?.status === 401) {
          try {
            // Начинаем обновление токена
            await startRefresh();
            // Повторяем проверку с новым токеном
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
    // staleTime: 5 * 60 * 1000,
  });
};
