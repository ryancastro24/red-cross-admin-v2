import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/Homepage";
import RegisterForm, {
  action as registerAction,
} from "./DashboardPages/RegisterForm";
import Analytics from "./DashboardPages/Analytics";
import Archives from "./DashboardPages/Archives";
import DataTable, {
  loader as dataTableLoader,
  action as dataTableAction,
} from "./DashboardPages/DataTable";
import InstructorPage from "./DashboardPages/Intructors";
import Certificate from "./DashboardPages/Certificate";
import Dashboard from "./pages/DashboardPage";
import { action as destroyUserAction } from "./destroypages/userDestroyAction";
const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },

  {
    path: "/dashboard",
    element: <Dashboard />,
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
      },

      {
        path: "archives",
        element: <Archives />,
      },

      {
        path: "instructor_page",
        element: <InstructorPage />,
      },

      {
        path: "certificate",
        element: <Certificate />,
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
