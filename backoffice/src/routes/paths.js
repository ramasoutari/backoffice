// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: "/auth",
  DASHBOARD: "/dashboard",
};

// ----------------------------------------------------------------------

export const paths = {
  notAuthorized: `/403`,
  // AUTH
  auth: {
    jwt: {
      login: `${ROOTS.AUTH}/login`,
      register: `${ROOTS.AUTH}/register`,
      forgotPassword: `${ROOTS.AUTH}/reset_password`,
      OTP: `${ROOTS.AUTH}/OTP`,
    },
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    settings: `${ROOTS.DASHBOARD}/settings`,
    applications: `${ROOTS.DASHBOARD}/applications`,
    users: `${ROOTS.DASHBOARD}/users`,
    entities: `${ROOTS.DASHBOARD}/entities`,
  },
};
