import { Loader } from "@components/shared";
import { Header } from "@components/widgets";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  const variant = "student";
  return (
    <Suspense fallback={<Loader />}>
      <Header variant={variant} />
      <Outlet />
    </Suspense>
  );
};

// export default Layout
