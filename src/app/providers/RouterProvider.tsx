import { Layout } from "@components/layouts";
import { URLS } from "@utils";
import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

interface Route {
  path: string;
  element: React.ReactElement;
}

const Homeworks = lazy(() => import("@components/pages/Homeworks/Homeworks"));
const Auth = lazy(() => import("@components/pages/Auth/Auth"));

export const appRoutes: Route[] = [
  {
    path: URLS.AUTH.LOGIN,
    element: <Auth />,
  },
  {
    path: URLS.AUTH.REGISTER,
    element: <Auth />,
  },
  {
    path: URLS.STUDENT.HOMEWORKS,
    element: <Homeworks />,
  },
];

const appRouter = createBrowserRouter([
  {
    element: <Layout />,
    children: appRoutes,
  },
]);

export const BrowserRouter = () => {
  return <RouterProvider router={appRouter} />;
};
