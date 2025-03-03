import { Helmet } from "react-helmet-async";
import DahboardView from "../../../sections/view/dashboard-view";
import UsersView from "../../../sections/view/users-view";
import { useAuthContext } from "../../../auth/hooks";

export default function DashboardPage() {
  const { user } = useAuthContext();

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>

      {user?.roles?.role === "SuperAdmin" ? <UsersView /> : <DahboardView />}
    </>
  );
}
