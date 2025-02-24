import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";
import { LoadingScreen } from "../../components/loading-screen";
import { AuthGuard } from "../../auth/guard";
import DashboardLayout from "../../layouts/dashboard/layout";

// ----------------------------------------------------------------------

const IndexPage = lazy(() => import("../../pages/dashboard/my-orders/list"));
const ApplicationsPage = lazy(() =>
  import("../../pages/dashboard/applications-list/list")
);
const UsersPage = lazy(() => import("../../pages/dashboard/users-list/users"));
const SettingsPage = lazy(() =>
  import("../../pages/dashboard/settings/settings")
);

export const dashboardRoutes = [
  {
    path: "dashboard",
    element: (
      // <AuthGuard>
      <DashboardLayout>
        <Suspense fallback={<LoadingScreen />}>
          <Outlet />
        </Suspense>
      </DashboardLayout>
      // </AuthGuard>
    ),
    children: [
      { element: <IndexPage />, index: true },
      {
        path: "applications",
        element: <ApplicationsPage />,
      },
      {
        path: "users",
        element: <UsersPage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
    ],
  },
];
