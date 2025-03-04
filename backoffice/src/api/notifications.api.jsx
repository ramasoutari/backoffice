import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../utils/axios";

export async function getUserNotifications(params) {
  const { page, pageSize, sort, sortBy, filters = {} } = params;

  const paramsToSend = {
    page,
    pageSize,
  };
  // Add filters to the query parameters in the format filters[field][$operator]=value
  Object.entries(filters).forEach(([field, conditions]) => {
    Object.entries(conditions).forEach(([operator, value]) => {
      if (Array.isArray(value) && value.length === 0) return;
      if (value === "" || value === null) return;

      paramsToSend[`filters[${field}][${operator}]`] = Array.isArray(value)
        ? value.join(",")
        : value;
    });
  });

  // Add sorting to the query parameters
  if (sort && sortBy) {
    paramsToSend.sortBy = sortBy;
    paramsToSend.sortDirection = sort;
  }

  return await axiosInstance
    .get(`/notification`, { params: paramsToSend })
    .then((response) => response.data?.data);
}

export function useGetUserNotifications(params) {
  return useQuery({
    queryKey: ["getUserNotifications", params],
    queryFn: () => getUserNotifications(params),
  });
}

export async function getUserUnreadNotifications() {
  return await axiosInstance
    .get(`/notification/unread`)
    .then((response) => response.data?.data);
}

export function useGetUserUnreadNotifications(enabled) {
  return useQuery({
    queryKey: ["getUserUnreadNotifications"],
    queryFn: () => getUserUnreadNotifications(),
    enabled: enabled,
  });
}

export async function markNotificationsAsRead({ ids }) {
  return await axiosInstance
    .patch(`/notification/bulk-mark-as-read`, {
      ids,
    })
    .then((response) => response.data);
}

export function useMarkNotificationsAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markNotificationsAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries([
        "getUserNotifications",
        "getUserUnreadNotifications",
      ]);
    },
  });
}

export async function markNotificationsAsUnread({ ids }) {
  return await axiosInstance
    .patch(`/notification/bulk-mark-as-unread`, {
      ids,
    })
    .then((response) => response.data);
}

export function useMarkNotificationsAsUnread() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markNotificationsAsUnread,
    onSuccess: () => {
      queryClient.invalidateQueries([
        "getUserNotifications",
        "getUserUnreadNotifications",
      ]);
    },
  });
}
