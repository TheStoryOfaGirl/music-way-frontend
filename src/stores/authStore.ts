import { AuthTokens, User, UserRole } from "@models";
import { create } from "zustand";

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  role: UserRole | null;
  name: string | null;
  isChangedPassword: boolean;
  login: (
    role: UserRole,
    name: string,
    tokens: AuthTokens,
    isChangedPassword: boolean,
  ) => void;
  logout: () => void;
  changePassword: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
  isChangedPassword: localStorage.getItem("isChangedPassword") === "true",
  role: (localStorage.getItem("role") as UserRole) || null,
  name: localStorage.getItem("name") || null,
  login: (role, name, tokens, isChangedPassword) => {
    localStorage.setItem("accessToken", tokens.access_token);
    localStorage.setItem("refreshToken", tokens.refresh_token);
    localStorage.setItem("role", role);
    localStorage.setItem("name", name);
    localStorage.setItem("isChangedPassword", String(isChangedPassword));
    localStorage.setItem("isAuthenticated", String(true));
    set({ name, isAuthenticated: true, role, isChangedPassword });
  },
  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("isChangedPassword");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("homeworks");
    set({
      isAuthenticated: false,
      role: null,
      name: null,
      isChangedPassword: true,
    });
  },
  changePassword: () => {
    localStorage.setItem("isChangedPassword", String("true"));
    set({ isChangedPassword: true });
  },
}));
