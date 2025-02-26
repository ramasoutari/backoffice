import { lazy } from "react";
import { Outlet } from "react-router-dom";
import CompactLayout from "../../layouts/compact/layout";
// layouts

// ----------------------------------------------------------------------

const Page404 = lazy(() => import("../../pages/404"));
const Page403 = lazy(() => import("../../pages/403"));

// ----------------------------------------------------------------------

export const mainRoutes = [
  {
    element: (
      <>
        <CompactLayout>
          <Outlet />
        </CompactLayout>
        {/* <Outlet /> */}
      </>
    ),
    children: [
      { path: "403", element: <Page403 /> },
      { path: "404", element: <Page404 /> },
    ],
  },
];
