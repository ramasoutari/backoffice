import { Helmet } from "react-helmet-async";
import UsersView from "../../../sections/view/users-view";

// ----------------------------------------------------------------------

export default function UsersPage() {
  return (
    <>
      <Helmet>
        <title>Dashboard: Users</title>
      </Helmet>

      <UsersView />
    </>
  );
}
