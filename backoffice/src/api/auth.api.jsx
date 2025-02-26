import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../utils/axios";

export async function login(data) {
  return await axiosInstance
    .post(`/user/login`, {
      username: data.username,
      password: data.password,
    })
    .then((response) => response.data);
}

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: () => {},
  });
}

export async function getMyInfo() {
  return await axiosInstance.get(`/me`).then((response) => response.data?.me);
}

export function useGetMyInfo() {
  return useQuery({
    queryKey: ["getMyInfo"],
    queryFn: () => getMyInfo(),
    refetchOnMount: false,
  });
}
