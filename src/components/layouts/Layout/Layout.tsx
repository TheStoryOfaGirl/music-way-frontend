import { Loader } from "@components/shared";
import { Header } from "@components/widgets";
import { useAuthStore } from "@stores";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Header/>
      <Outlet />
    </Suspense>
  );
};

// export default Layout
