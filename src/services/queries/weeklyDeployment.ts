import { useQuery } from "@tanstack/react-query";

import type { FilterOptions } from "@/types/weeklyDeployment";

import { paramsToUrl } from "@/helpers";
import { client } from "@/helpers/client";

async function getWeeklyDeployment(params: FilterOptions): Promise<any> {
  const urlEncode = paramsToUrl(params);
  const url = `/v1/supply_demand/generateWeeklyDeploymentSummary?${urlEncode}`;
  const headers = {};
  return client({
    url,
    method: "GET",
    headers,
  }).then((response) => {
    return response ?? [];
  });
}

export function useGetWeeklyDeployment(params: FilterOptions) {
  return useQuery({
    queryKey: ["get-weekly-deployment", params],
    queryFn: () => getWeeklyDeployment(params),
    networkMode: "online",
    staleTime: 1000 * 60, // cache is fresh for 1 minute
    refetchOnWindowFocus: false,
    retry: 1, // retry once on failure
  });
}
