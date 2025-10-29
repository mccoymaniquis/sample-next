import { useMutation } from "@tanstack/react-query";

import { client } from "@/helpers/client";

const FORGOT_PASSWORD_API = "/v1/request-reset";

// Define input type
export type ForgotPasswordParams = {
  email: string;
};

export type ForgotPasswordResponse = {
  email: string;
  resendAttempts: number;
  thirdAttemptTime: string;
};

// Define async API call
export async function requestPasswordReset(params: ForgotPasswordParams): Promise<ForgotPasswordResponse> {
  const response = await client<ForgotPasswordResponse>({
    url: FORGOT_PASSWORD_API,
    method: "POST",
    data: params,
  });

  return response as unknown as ForgotPasswordResponse;
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: (params: ForgotPasswordParams) => requestPasswordReset(params),
    retry: 0,
  });
}
