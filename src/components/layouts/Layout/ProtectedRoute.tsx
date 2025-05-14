import { Navigate, Outlet, useLocation } from "react-router-dom";
import { UserRole } from "@models";
import { useAuthStore } from "@stores";
import { URLS } from "@utils";
import { useCheckAuth } from "@api";
import { Loader } from "@components/shared";

interface ProtectedRouteProps {
  roles?: UserRole[];
};

export const ProtectedRoute = ({ roles }: ProtectedRouteProps) => {
  const location = useLocation();
  const { isAuthenticated, role, isChangedPassword } = useAuthStore();
  console.log(location.pathname);

  console.log(isAuthenticated, "isAuth");
    if (!isAuthenticated || !isChangedPassword) return <Navigate to={URLS.AUTH.LOGIN} replace />;
  if (roles && !roles.includes(role as UserRole)) {
    return <Navigate to={URLS.NOT_FOUND} replace />;
  }


  return <Outlet />
};