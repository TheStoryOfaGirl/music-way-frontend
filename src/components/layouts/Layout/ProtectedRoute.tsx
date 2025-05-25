import { Navigate, Outlet } from "react-router-dom";
import { UserRole } from "@models";
import { useAuthStore } from "@stores";
import { URLS } from "@utils";

interface ProtectedRouteProps {
  roles?: UserRole[];
}

export const ProtectedRoute = ({ roles }: ProtectedRouteProps) => {
  const { isAuthenticated, role, isChangedPassword } = useAuthStore();

  if (!isAuthenticated || !isChangedPassword)
    return <Navigate to={URLS.AUTH.LOGIN} replace />;
  if (roles && !roles.includes(role as UserRole)) {
    return <Navigate to={URLS.NOT_FOUND} replace />;
  }

  return <Outlet />;
};
