import { Loader } from "@components/shared";
import { Header } from "@components/widgets";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Header />
      <Outlet />
    </Suspense>
  );
};
