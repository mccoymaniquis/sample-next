// src/hooks/mutations/user.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/helpers/client";

type CreateUserRequest = {
  employeesDTO: {
    firstName: string;
    middleName?: string;
    lastName: string;
    suffix?: string;
    empEmail: string;
  };
  role: string;
};

type UpdateUserRequest = CreateUserRequest & {
  id: number;
};

export async function createUser(params: CreateUserRequest): Promise<void> {
  const url = "/v1/users/create";
  const response = await client({
    url,
    method: "POST",
    data: params,
  });
  return response.data;
}

export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-all-users"] });
    },
    onError: (error) => {
      console.error("Error creating user:", error);
    },
  });
}

// API Call
export async function updateUser(params: UpdateUserRequest): Promise<void> {
  const url = `/v1/users/updateUser/${params.id}`;
  const { id, ...data } = params;
  const response = await client({
    url,
    method: "PUT",
    data,
  });
  return response.data;
}

// Hook
export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-all-users"] });
    },
    onError: (error) => {
      console.error("Error updating user:", error);
    },
  });
}

export async function updateUserStatus(params: any): Promise<void> {
  const url = `v1/users/updateUserStatus`;
  const response = await client({
    url,
    method: "PATCH",
    data: params,
  });
  return response.data;
}

export function useUpdateUserStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUserStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-all-users"] });
    },
    onError: (error) => {
      console.error("Error updating user status:", error);
    },
  });
}
