import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/axios";

export async function getDrepartments() {
  return await axiosInstance
    .get(`/departments`)
    .then((response) => response.data?.departments);
}

export function useGetDepartments() {
  return useQuery({
    queryKey: ["getDrepartments"],
    queryFn: () => getDrepartments(),
    initialData: [],
  });
}

export async function getDrepartmentRoles(DepartmentId) {
  return await axiosInstance
    .get(`/department/${DepartmentId}/roles`)
    .then((response) => response.data?.roles);
}

export function useGetDepartmentRoles(DepartmentId) {
  return useQuery({
    queryKey: ["getDrepartmentRoles", DepartmentId],
    queryFn: () => getDrepartmentRoles(DepartmentId),
    initialData: [],
    refetchOnMount: false,
  });
}
