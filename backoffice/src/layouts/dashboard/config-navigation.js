import { useCallback, useMemo } from "react";
import { useAuthContext } from "../../auth/hooks";
import { paths } from "../../routes/paths";
import { useLocales } from "../../locales";
import usePermissions from "../../hooks/use-permissions";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export function useNavData() {
  const { user } = useAuthContext();
  const { t } = useLocales();
  const { hasPermission } = usePermissions();

  const getMenuItems = useCallback(() => {
    if (user) {
      console.log("userrr", user.permissions);
      return [
        hasPermission("APPLICATION:READ") && {
          title: t("dashboard"),
          path: paths.dashboard.root,
          auth: true,
          border: true,
          "data-tour-id": "my_orders_btn",
        },
        hasPermission("APPLICATION:READ") && {
          title: t("applications"),
          path: paths.dashboard.applications,
          auth: true,
          border: true,
          "data-tour-id": "applications_btn",
        },
        (hasPermission("SUPER_ADMIN:ALL_ACCESS") ||
          hasPermission("USERS:CREAT")) && {
          title: t("users"),
          path: paths.dashboard.users,
          auth: true,
          border: true,
          "data-tour-id": "users_btn",
        },
        (hasPermission("SUPER_ADMIN:ALL_ACCESS") ||
          hasPermission("ENTITY:READ")) && {
          title: t("entities"),
          path: paths.dashboard.entities,
          auth: true,
          border: true,
          "data-tour-id": "entities_btn",
        },
      ].filter(Boolean);
    } else {
      return [
        {
          title: t("home"),
          path: paths.dashboard.root,
          guest: true,
          border: true,
        },
      ];
    }
  }, [t, user, hasPermission]);

  const data = useMemo(
    () => [
      // OVERVIEW
      // ----------------------------------------------------------------------
      {
        // subheader: t('overview'),
        items: getMenuItems(),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t, user?.clinic?.EntityStatus_Code, t]
  );

  return data;
}
