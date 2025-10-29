import { useQuery } from "@tanstack/react-query";

import { paramsToUrl } from "@/helpers";
import { client } from "@/helpers/client";

export type HighestDemandWon = {
  demandLevel?: string;
  startDate?: string;
  endDate?: string;
};

export type HighestBench = {
  benchType?: string;
  startDate?: string;
};

async function getHighestDemandWon(params: HighestDemandWon): Promise<any> {
  const urlEncode = paramsToUrl(params);
  const url = `/v1/demand/getTopRolesWithHighestDemandBench?${urlEncode}`;
  const headers = {};
  return client({
    url,
    method: "GET",
    headers,
  }).then((response) => {
    return response.data;
  });
}

async function getHighestBenchAfterWon(params: HighestBench): Promise<any> {
  const urlEncode = paramsToUrl(params);
  const url = `/v1/demand/getRolesWithHighestBench?${urlEncode}`;
  const headers = {};
  return client({
    url,
    method: "GET",
    headers,
  }).then((response) => {
    return response ?? [];
  });
}

async function getBenchTypes(): Promise<any> {
  const url = `/v1/demand/getBenchTypes`;
  const headers = {};
  return client({
    url,
    method: "GET",
    headers,
  }).then((response) => {
    return response ?? [];
  });
}

async function getDemandLevels(): Promise<any> {
  const url = `/v1/demand/getDemandLevels`;
  const headers = {};
  return client({
    url,
    method: "GET",
    headers,
  }).then((response) => {
    return response ?? [];
  });
}

export function useGetHighestDemandWon(params: HighestDemandWon) {
  return useQuery({
    queryKey: ["get-highest-demand-won", params],
    queryFn: () => getHighestDemandWon(params),
    networkMode: "online",
  });
}

export function useGetHighestBenchAfterWon(params: HighestBench) {
  return useQuery({
    queryKey: ["get-highest-bench-after-won", params],
    queryFn: () => getHighestBenchAfterWon(params),
    networkMode: "online",
  });
}

export function useGetBenchTypes() {
  return useQuery({
    queryKey: ["get-bench-types"],
    queryFn: () => getBenchTypes(),
    networkMode: "online",
  });
}

export function useGetDemandLevels() {
  return useQuery({
    queryKey: ["get-demand-levels"],
    queryFn: () => getDemandLevels(),
    networkMode: "online",
  });
}
