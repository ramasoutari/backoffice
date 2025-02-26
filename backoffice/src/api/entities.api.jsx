import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../utils/axios";

export async function getEntities() {
  return await axiosInstance
    .get(
      `/entity
`
    )
    .then((response) => response.data?.entities);
}

export function useGetEntities() {
  return useQuery({
    queryKey: ["getEntities"],
    queryFn: () => getEntities(),
    initialData: [],
  });
}
export async function entityApprove({ id }) {
  return await axiosInstance
    .patch(`/entity/${id}/approve`)
    .then((response) => response.data);
}

export function useEntityApprove() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: entityApprove,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getEntities"],
      });
    },
  });
}
export async function entityReject({ id }) {
  return await axiosInstance
    .patch(`/entity/${id}/decline`)
    .then((response) => response.data);
}

export function useEntityReject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: entityReject,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getEntities"],
      });
    },
  });
}

export async function deleteEntity({ EntityId }) {
  return await axiosInstance
    .delete(`/entity/${EntityId}/delete`)
    .then((response) => response.data);
}

export function useDeleteEntity() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteEntity,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getEntities"],
      });
    },
  });
}
