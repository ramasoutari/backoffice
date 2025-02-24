import { Helmet } from "react-helmet-async";
import ApplicationsView from "../../../sections/view/applications-view";

// ----------------------------------------------------------------------

export default function MyOrdersPage() {

  return (
    <>
      <Helmet>
        <title>Dashboard: My Applications</title>
      </Helmet>

      <ApplicationsView />
    </>
  );
}
