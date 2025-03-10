import axios from "axios";
import { HOST_API } from "../config-global";
// config

// ----------------------------------------------------------------------
// const language = localStorage.getItem("i18nextLng");

export const axiosInstance = axios.create({
  baseURL: HOST_API,
});

// Interceptors
// Can be migrated to seperate folder and put here
// axiosInstance.interceptors.use for each interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const language = localStorage.getItem("i18nextLng");
    const accessToken = localStorage.getItem("accessToken");
    const x_session_id = localStorage.getItem("sessionId");
    config.headers["Accept-language"] = language;
    config.headers["Authorization"] = `Bearer ${accessToken}`;
    config.headers["x-session-id"] = x_session_id;

    return config;
  },
  (error) => {
    // return Promise.reject(error);
  }
);
axiosInstance.interceptors.request.use(
  async (config) => {
    const { url } = config;

    if (url.includes("login") || url.includes("forget-password")) {
      try {
        const response = await axiosInstance.post(
          `${HOST_API}/GenerateGuestToken`
        );
        const guestToken = response?.data;
        config.headers["x-guest-token"] = guestToken;
      } catch (error) {
        console.log(error);
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
