import { useTheme } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { io } from "socket.io-client";
import { useAuthContext } from "../auth/hooks";
import { SOCKET_PATH, SOCKET_URL } from "../config-global";

const NotificationContext = createContext(undefined);

export const NotificationProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const theme = useTheme();
  const { user } = useAuthContext();
  const [notifications, setNotifications] = useState([]);
  const [notificationTrigger, setNotificationTrigger] = useState(0);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (user?.id) {
      // Connect to the notifications namespace
      const socketInstance = io(`${SOCKET_URL}/notifications`, {
        path: SOCKET_PATH,
        query: { userId: user?.id },
      });

      // Listen for incoming notifications
      socketInstance.on("receive-notification", (notification) => {
        setNotifications((prev) => [...prev, notification]);
        setNotificationTrigger((prev) => prev + 1);

        const notificationHasData =
          notification?.data && typeof notification.data === "string";
      });

      // Set the socket instance globally
      setSocket(socketInstance);

      // Cleanup on unmount
      return () => {
        socketInstance.disconnect();
      };
    }
  }, [user?.id]);

  const addNotification = useCallback((notification) => {
    setNotifications((prev) => [...prev, notification]);
  }, []);

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, socket, notificationTrigger }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};
