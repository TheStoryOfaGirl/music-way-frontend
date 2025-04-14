import { AuthTokens, User, UserRole } from "@models";
import { create } from "zustand";

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  role: UserRole | null;
  login: (user: User, tokens: AuthTokens) => void;
  logout: () => void;
  // hasRole: (role: UserRole) => boolean; // Проверка роли
};

export const useAuthStore = create<AuthState>((set, _) => ({
  user: null,
  isAuthenticated: !!localStorage.getItem("accessToken"),
  role: (localStorage.getItem("role") as UserRole) || null,
  login: (user, tokens) => {
    localStorage.setItem("accessToken", tokens.accessToken);
    localStorage.setItem("refreshToken", tokens.refreshToken);
    localStorage.setItem("role", user.role);
    set({ user, isAuthenticated: true, role: user.role });
  },
  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");
    set({ user: null, isAuthenticated: false, role: null });
  },
  // hasRole: (role) => {
  //   const currentRole = get().role;
  //   return currentRole === role;
  // },
}));
