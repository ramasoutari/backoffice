import { useCallback, useEffect, useMemo } from "react";

import { useAuthContext } from "../auth/hooks";
import { useRouter } from "../routes/hooks";
import { paths } from "../routes/paths";

export default function usePermissions(userFromAbove) {
  const { user: userFromContext, roleId } = useAuthContext();
  const user = useMemo(
    () => userFromAbove || userFromContext,
    [userFromAbove, userFromContext]
  );
  const userPermissions = useMemo(() => {
    return (user?.permissions || []).map((permission) => permission?.id);
  }, [user]);
  const { replace } = useRouter();

  const redirectIfNoPermission = useCallback(
    (requiredPermissions) => {
      if (!user) {
        return replace(paths.auth.jwt.login);
      }
      if (!canViewScreen(requiredPermissions)) {
        return replace(paths.notAuthorized);
      }
    },
    [userPermissions, user]
  );

  const canViewScreen = useCallback(
    (requiredPermissions) => {
      if (Array.isArray(requiredPermissions)) {
        if (requiredPermissions.length === 0) {
          return true;
        }
        return requiredPermissions.some((permission) =>
          userPermissions.includes(permission)
        );
      } else if (typeof requiredPermissions === "object") {
        const requiredPermissionsFromObject =
          Object.values(requiredPermissions);

        if (requiredPermissionsFromObject.length === 0) {
          return true;
        }

        return requiredPermissionsFromObject.some((permission) =>
          userPermissions.includes(permission)
        );
      }

      if (!requiredPermissions) {
        return true;
      }

      return userPermissions.includes(requiredPermissions);
    },
    [userPermissions]
  );

  const hasPermission = (permission) => {
    return user?.permissions?.some((p) => p.name === permission);
  };


  return {
    redirectIfNoPermission,
    canViewScreen,
    hasPermission,
    userPermissions,
  };
}

export function useScreenGuard(screenCode, actionCode) {
  const { redirectIfNoPermission } = usePermissions();

  useEffect(() => {
    redirectIfNoPermission(screenCode, actionCode);
  }, [screenCode, actionCode]);
}
