import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../utils/axios";

export async function getUsers() {
  return await axiosInstance
    .get(`/users`)
    .then((response) => response.data?.users);
}

export function useGetUsers() {
  return useQuery({
    queryKey: ["getUsers"],
    queryFn: () => getUsers(),
    initialData: [],
  });
}

export async function registerUser(data) {
  return await axiosInstance
    .post(`/user/register`, data)
    .then((response) => response.data);
}

export function useRegisterUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getUsers"] });
    },
  });
}

export async function updateUser({ id, data }) {
  return await axiosInstance
    .patch(`users/${id}/update`, data)
    .then((response) => response.data);
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getUsers"] });
    },
  });
}
export async function deleteUser({ id}) {
  return await axiosInstance
    .delete(`/users/${id}/delete`, {
    })
    .then((response) => response.data);
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getUsers"] });
    },
  });
}