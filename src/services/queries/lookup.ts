import { useQuery } from "@tanstack/react-query";

import { paramsToUrl } from "@/helpers";
import { client } from "@/helpers/client";

export type LookUpResponse = string[];
export type ProjectNameProps = {
  clientName: string;
};

async function getRoleFamily(): Promise<LookUpResponse> {
  const url = `/v1/lookup/getAllRoleFamily`;
  const headers = {};
  return client({
    url,
    method: "GET",
    headers,
  }).then((response) => {
    return response.data;
  });
}

export function useGetRoleFamily() {
  return useQuery({
    queryKey: ["get-role-family"],
    queryFn: () => getRoleFamily(),
    networkMode: "online",
  });
}

async function getCareerLevel(): Promise<LookUpResponse> {
  const url = `/v1/lookup/getAllCareerLevel`;
  const headers = {};
  return client({
    url,
    method: "GET",
    headers,
  }).then((response) => {
    return response.data;
  });
}

export function useGetCareerLevel() {
  return useQuery({
    queryKey: ["get-career-level"],
    queryFn: () => getCareerLevel(),
    networkMode: "online",
  });
}

async function getCommitLevel(): Promise<LookUpResponse> {
  const url = `/v1/lookup/getAllCommitLevel`;
  const headers = {};
  return client({
    url,
    method: "GET",
    headers,
  }).then((response) => {
    return response.data;
  });
}

export function useGetCommitLevel() {
  return useQuery({
    queryKey: ["get-commit-level"],
    queryFn: () => getCommitLevel(),
    networkMode: "online",
  });
}

async function getClientNames(): Promise<LookUpResponse> {
  const url = `/v1/demand/getAllClientName`;
  const headers = {};
  return client({
    url,
    method: "GET",
    headers,
  }).then((response) => {
    return response.data;
  });
}

export function useGetClientNames() {
  return useQuery({
    queryKey: ["get-client-names"],
    queryFn: () => getClientNames(),
    networkMode: "online",
  });
}

async function getProjectNameByClient(params: ProjectNameProps): Promise<LookUpResponse> {
  const urlEncode = paramsToUrl(params);
  const url = `/v1/demand/getAllProjectNameByClient?${urlEncode}`;
  const headers = {};
  return client({
    url,
    method: "GET",
    headers,
  }).then((response) => {
    return response.data;
  });
}

export function useGetProjectNameByClient(params: ProjectNameProps) {
  return useQuery({
    queryKey: ["get-project-names", params],
    queryFn: () => getProjectNameByClient(params),
    networkMode: "online",
  });
}
