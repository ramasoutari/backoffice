import { Helmet } from "react-helmet-async";
import DahboardView from "../../../sections/view/dashboard-view";

// ----------------------------------------------------------------------

export default function DashboardPage() {
  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>

      <DahboardView />
    </>
  );
}
