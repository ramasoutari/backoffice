import PropTypes from "prop-types";
import { useReducer, useCallback, useMemo, useEffect } from "react";
// utils
//
import { AuthContext } from "./auth-context";
import { setSession } from "./utils";
import { useAuthContext } from "../hooks";
import { HOST_API, PATH_AFTER_LOGIN } from "../../config-global";
import axiosInstance from "../../utils/axios";
import { useGetMyInfo, useLogin } from "../../api/auth.api";
import { useRouter } from "../../routes/hooks";

// ----------------------------------------------------------------------

// NOTE:
// We only build demo at basic level.
// Customer will need to do some extra handling yourself if you want to extend the logic and other features...

// ----------------------------------------------------------------------

const initialState = {
  user: null,
  loading: true,
};
const reducer = (state, action) => {
  if (action.type === "INITIAL") {
    return {
      loading: false,
      user: action.payload.user,
    };
  }
  if (action.type === "LOGIN") {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === "REGISTER") {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === "LOGOUT") {
    return {
      ...state,
      user: null,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

const STORAGE_KEY = "accessToken";

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user } = useAuthContext();
  const router = useRouter();
  const getMyInfo = useGetMyInfo();

  const initialize = useCallback(async () => {
    try {
      const accessToken = localStorage.getItem(STORAGE_KEY);

      // if (accessToken && isValidToken(accessToken)) {
      if (accessToken) {
        setSession(accessToken);

        const response = await getMyInfo.refetch();
        console.log("response", response);

        const user = response.data;
        setSession(user.token);

        dispatch({
          type: "INITIAL",
          payload: {
            user,
          },
        });
      } else {
        logout();
        dispatch({
          type: "INITIAL",
          payload: {
            user: null,
          },
        });
      }
    } catch (error) {
      logout();
      console.error(error);
      dispatch({
        type: "INITIAL",
        payload: {
          user: null,
        },
      });
    }
  }, []);

  // LOGIN
  const login = (sessionId, token) => {
    setSession(token);
    localStorage.setItem("sessionId", sessionId);
    initialize();
  };

  // LOGOUT
  const logout = useCallback(async () => {
    setSession(null);

    dispatch({
      type: "LOGOUT",
    });
  }, []);

  useEffect(() => {
    initialize();
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? "authenticated" : "unauthenticated";

  const status = state.loading ? "loading" : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      method: "jwt",
      loading: status === "loading",
      authenticated: status === "authenticated",
      unauthenticated: status === "unauthenticated",
      accessToken: localStorage.getItem(STORAGE_KEY),
      //
      initialize,
      login,
      logout,
    }),
    [login, logout, state.user, status]
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
