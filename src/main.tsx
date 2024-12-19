// @ts-ignore
import "@fontsource/poppins";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage, { action as loginAction } from "./pages/Homepage";
import RegisterForm, {
  action as registerAction,
} from "./DashboardPages/RegisterForm";
import Analytics, {
  loader as analyticsLoader,
} from "./DashboardPages/Analytics";
import Archives from "./DashboardPages/Archives";
import DataTable, {
  loader as dataTableLoader,
  action as dataTableAction,
} from "./DashboardPages/DataTable";
import InstructorPage, {
  loader as instructorLoader,
} from "./DashboardPages/Intructors";
import Certificate, {
  loader as certificateLoader,
  action as certificateAction,
} from "./DashboardPages/Certificate";
import Dashboard from "./pages/DashboardPage";
import { action as destroyUserAction } from "./destroypages/userDestroyAction";
import InstructorRatingDetials, {
  loader as instructorRatingLoader,
} from "./components/InstructorRatingDetials";
import RedirectIfAuthenticated from "./components/RedirectIfAuthenticated";
import PrivateRoute from "./components/PrivateRoute";
import ErrorPage from "./pages/ErrorPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <RedirectIfAuthenticated />
        <LoginPage />
      </>
    ),
    action: loginAction,
    errorElement: <ErrorPage />,
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),

    children: [
      {
        path: "/dashboard",
        element: <RegisterForm />,
        action: registerAction,
      },

      {
        path: "datatable",
        element: <DataTable />,
        loader: dataTableLoader,
        action: dataTableAction,
        children: [
          {
            path: ":userId/destroy",
            action: destroyUserAction,
          },
        ],
      },

      {
        path: "analytics",
        element: <Analytics />,
        loader: analyticsLoader,
      },

      {
        path: "archives",
        element: <Archives />,
      },

      {
        path: "instructor_page",
        element: <InstructorPage />,
        loader: instructorLoader,
      },

      {
        path: "certificate",
        element: <Certificate />,
        loader: certificateLoader,
        action: certificateAction,
      },
      {
        path: "instructor_page/instructor_ratings/:id",
        element: <InstructorRatingDetials />,
        loader: instructorRatingLoader,
      },
    ],
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NextUIProvider>
      <RouterProvider router={router} />
    </NextUIProvider>
  </StrictMode>
);
