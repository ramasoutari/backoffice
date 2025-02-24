import { lazy } from "react";
import { Outlet } from "react-router-dom";
import CompactLayout from "../../layouts/compact/layout";
// layouts

// ----------------------------------------------------------------------

const Page404 = lazy(() => import("../../pages/404"));
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
      { path: "404", element: <Page404 /> },
    ],
  },
];
