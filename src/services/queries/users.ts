import { useQuery } from "@tanstack/react-query";

import type { User } from "@/types/users";

import { paramsToUrl } from "@/helpers";
import { client } from "@/helpers/client";

export type UserParams = {
  email: string | null;
};

export type UserGetAllParams = {
  page?: number;
  size?: number;
  sort?: string;
};
async function getUserDetails(params: UserParams): Promise<User> {
  const urlEncode = paramsToUrl(params);
  const url = `/v1/users?${urlEncode}`;
  const headers = {};
  return client({
    url,
    method: "GET",
    headers,
  }).then((response) => {
    return response.data;
  });
}

export function useGetUserDetails(params: UserParams) {
  const { email } = params;
  return useQuery({
    queryKey: ["get-user-details", params],
    queryFn: async () => await getUserDetails(params),
    enabled: !!email, // only fetch if email is not null
    networkMode: "online",
  });
}

async function getAllUsers(params: UserGetAllParams): Promise<any> {
  const urlEncode = paramsToUrl(params);
  const url = `/v1/users/all?${urlEncode}`;
  const headers = {};
  return client({
    url,
    method: "GET",
    headers,
  }).then((response) => {
    return response.data;
  });
}

export function useGetAllUsers(params: UserGetAllParams) {
  return useQuery({
    queryKey: ["get-all-users", params],
    queryFn: async () => await getAllUsers(params),
    networkMode: "online",
  });
}
