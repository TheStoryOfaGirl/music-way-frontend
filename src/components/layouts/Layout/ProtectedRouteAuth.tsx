import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@stores";
import { URLS } from "@utils";

export const ProtectedRouteAuth = () => {
  const { isAuthenticated, role, isChangedPassword } = useAuthStore();
  if (role === "Преподаватель" && isAuthenticated && isChangedPassword) 
    return <Navigate to={URLS.TEACHER.CLASSES} replace />;
  else if (role === "Ученик" && isAuthenticated && isChangedPassword)
    return <Navigate to={URLS.STUDENT.HOMEWORKS} replace />;

  return <Outlet />;
};