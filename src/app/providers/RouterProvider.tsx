import {
  Layout,
  ProtectedRoute,
  ProtectedRouteAuth,
} from "@components/layouts";
import { URLS } from "@utils";
import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

interface RouteParent {
  path?: string;
  element: React.ReactElement;
}

interface Route extends RouteParent {
  children?: RouteParent[];
}

const Homeworks = lazy(() => import("@components/pages/Homeworks/Homeworks"));
const Auth = lazy(() => import("@components/pages/Auth/Auth"));
const TrainingSimulators = lazy(
  () => import("@components/pages/TrainingSimulators/TrainingSimulators"),
);
const TrainingSimulator = lazy(
  () => import("@components/pages/TrainingSimulator/TrainingSimulator"),
);
const Materials = lazy(() => import("@components/pages/Materials/Materials"));
const StatisticsStudent = lazy(
  () => import("@components/pages/StatisticsStudent/StatisticsStudent"),
);
const ActiveHomeworkInfo = lazy(
  () => import("@components/pages/ActiveHomeworkInfo/ActiveHomeworkInfo"),
);
const Theme = lazy(() => import("@components/pages/Theme/Theme"));
const CompletedHomeworkStudent = lazy(
  () =>
    import(
      "@components/pages/CompletedHomeworkStudent/CompletedHomeworkStudent"
    ),
);
const HomeworkStudent = lazy(
  () => import("@components/pages/HomeworkStudent/HomeworkStudent"),
);
const PageNotFound = lazy(
  () => import("@components/pages/PageNotFound/PageNotFound"),
);
const Classes = lazy(() => import("@components/pages/Classes/Classes"));
const StatisticsTeacher = lazy(
  () => import("@components/pages/StatisticsTeacher/StatisticsTeacher"),
);
const HomeworkTeacher = lazy(
  () => import("@components/pages/HomeworkTeacher/HomeworkTeacher"),
);
const CreatureHomeworkTeacher = lazy(
  () =>
    import("@components/pages/CreatureHomeworkTeacher/CreatureHomeworkTeacher"),
);

const appRoutes: Route[] = [
  {
    element: <ProtectedRouteAuth />,
    children: [{ path: URLS.AUTH.LOGIN, element: <Auth /> }],
  },
  {
    element: <ProtectedRouteAuth />,
    children: [{ path: URLS.AUTH.REGISTER, element: <Auth /> }],
  },
  {
    element: <ProtectedRoute roles={["Ученик", "Преподаватель"]} />,
    children: [{ path: `${URLS.MATERIALS}/:id`, element: <Theme /> }],
  },
  {
    element: <ProtectedRoute roles={["Ученик"]} />,
    children: [{ path: URLS.STUDENT.HOMEWORKS, element: <Homeworks /> }],
  },
  {
    element: <ProtectedRoute roles={["Ученик"]} />,
    children: [
      {
        path: `${URLS.STUDENT.HOMEWORKS}/:id/active`,
        element: <ActiveHomeworkInfo />,
      },
    ],
  },
  {
    element: <ProtectedRoute roles={["Ученик"]} />,
    children: [
      {
        path: URLS.STUDENT.TRAINING_SIMULATORS,
        element: <TrainingSimulators />,
      },
    ],
  },
  {
    element: <ProtectedRoute roles={["Ученик"]} />,
    children: [
      {
        path: `${URLS.STUDENT.TRAINING_SIMULATORS}/:id`,
        element: <TrainingSimulator />,
      },
    ],
  },
  {
    element: <ProtectedRoute roles={["Ученик", "Преподаватель"]} />,
    children: [
      {
        path: URLS.MATERIALS,
        element: <Materials />,
      },
    ],
  },
  {
    element: <ProtectedRoute roles={["Ученик"]} />,
    children: [
      { path: URLS.STUDENT.STATISTICS, element: <StatisticsStudent /> },
    ],
  },
  {
    element: <ProtectedRoute roles={["Ученик"]} />,
    children: [
      {
        path: `${URLS.STUDENT.HOMEWORKS}/:id/active/execute`,
        element: <HomeworkStudent />,
      },
    ],
  },
  {
    element: <ProtectedRoute roles={["Ученик"]} />,
    children: [
      {
        path: `${URLS.STUDENT.HOMEWORKS}/:id/completed`,
        element: <CompletedHomeworkStudent />,
      },
    ],
  },
  {
    element: <ProtectedRoute roles={["Преподаватель"]} />,
    children: [{ path: URLS.TEACHER.CLASSES, element: <Classes /> }],
  },
  {
    element: <ProtectedRoute roles={["Преподаватель"]} />,
    children: [
      {
        path: `${URLS.TEACHER.CLASSES}/:classId/homeworks/:homeworkId/completed`,
        element: <HomeworkTeacher />,
      },
    ],
  },
  {
    element: <ProtectedRoute roles={["Преподаватель"]} />,
    children: [
      {
        path: `${URLS.TEACHER.CLASSES}/:classId/homeworks/:homeworkId/active`,
        element: <HomeworkTeacher />,
      },
    ],
  },
  {
    element: <ProtectedRoute roles={["Преподаватель"]} />,
    children: [
      {
        path: `${URLS.TEACHER.CLASSES}/:classId/statistic`,
        element: <StatisticsTeacher />,
      },
    ],
  },
  {
    element: <ProtectedRoute roles={["Преподаватель"]} />,
    children: [
      {
        path: `${URLS.TEACHER.CLASSES}/:classId/homeworks/create`,
        element: <CreatureHomeworkTeacher />,
      },
    ],
  },
  {
    path: URLS.NOT_FOUND,
    element: <PageNotFound />,
  },
  {
    path: "*",
    element: <PageNotFound />,
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
