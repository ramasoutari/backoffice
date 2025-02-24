import { Helmet } from "react-helmet-async";
import DahboardView from "../../../sections/view/dashboard-view";

// ----------------------------------------------------------------------

export default function MyOrdersPage() {

  return (
    <>
      <Helmet>
        <title>Dashboard: My Applications</title>
      </Helmet>

      <DahboardView />
    </>
  );
}
