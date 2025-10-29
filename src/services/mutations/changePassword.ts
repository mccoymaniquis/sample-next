import { useMutation } from "@tanstack/react-query";

import { client } from "@/helpers/client";

const CHANGE_PASSWORD_API = "/v1/users/changePassword";
const RESET_PASSWORD_API = "/v1/reset-password";

export type ChangePasswordParams = {
  currentPassword?: string;
  newPassword: string;
  oldPassword?: string;
  email?: string;
};

export type ResetPasswordParams = {
  token: string;
  newPassword: string;
};

export async function changePassword<T extends ChangePasswordParams>(params: T): Promise<T> {
  const url = CHANGE_PASSWORD_API;
  const headers = {};
  const response = await client({
    url,
    method: "POST",
    headers,
    data: params,
  });

  return response.data;
}

export async function resetPassword(params: ResetPasswordParams): Promise<void> {
  await client({
    url: RESET_PASSWORD_API,
    method: "POST",
    data: params,
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: (params: ChangePasswordParams) => changePassword(params),
    retry: 0,
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: (params: ResetPasswordParams) => resetPassword(params),
    retry: 0,
  });
}
