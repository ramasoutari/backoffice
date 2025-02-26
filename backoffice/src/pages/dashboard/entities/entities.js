import { Helmet } from "react-helmet-async";
import DepartmentsView from "../../../sections/view/entities-view";
import EntitiesView from "../../../sections/view/entities-view";

// ----------------------------------------------------------------------

export default function DepartmentsPage() {
  return (
    <>
      <Helmet>
        <title>Dashboard: Departments</title>
      </Helmet>

      <EntitiesView />
    </>
  );
}
