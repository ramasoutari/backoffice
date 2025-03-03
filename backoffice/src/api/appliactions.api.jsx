import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../utils/axios";

export async function getApplications(id, status) {
  return await axiosInstance
    .get(`/workflow/all/${id}`, {
      params: {
        status,
      },
    })
    .then((response) => response.data?.data);
}

export function useGetApplications() {
  return useMutation({
    mutationKey: ["getApplications"],
    mutationFn: (data) => getApplications(data.id, data.status),
  });
}
export async function getApplication(id) {
  return await axiosInstance
    .get(`/workflow/${id}/open`)
    .then((response) => response.data);
}

export function useGetApplication() {
  return useMutation({
    mutationKey: ["getApplication"],
    mutationFn: (data) => getApplication(data.id),
  });
}
export async function submitApplication(data) {
  const query = data.currentDialog
    ? Number(data.currentDialog)
    : data.buttonIndex;
  console.log("query", query);
  return await axiosInstance
    .post(
      `/workflow/${data.ApplicaitonNumber}/transition?choice=${query}`,
      data.rejectionReason
        ? {
            rejectionReason: data.rejectionReason,
          }
        : data.type || data.title
        ? [
            {
              type: data.type,
              title: data.title,
            },
          ]
        : null
    )
    .then((response) => response.data);
}

export function useSubmitApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submitApplication,
    onSuccess: () => {
      queryClient.invalidateQueries(["getApplications"]);
    },
  });
}
