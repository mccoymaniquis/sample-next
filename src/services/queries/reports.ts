import { useQuery } from "@tanstack/react-query";

import type { FilterOptions } from "@/types/reports";

import { paramsToUrl } from "@/helpers";
import { client } from "@/helpers/client";

async function getReportList(params: FilterOptions): Promise<any> {
  const urlEncode = paramsToUrl(params);
  const url = `/v1/supply_demand/generateSupplyAndDemand?${urlEncode}`;
  const headers = {};
  return client({
    url,
    method: "GET",
    headers,
  }).then((response) => {
    return response?.data;
  });
}

export function useGetReportList(params: FilterOptions) {
  return useQuery({
    queryKey: ["get-report-list", params],
    queryFn: () => getReportList(params),
    networkMode: "online",
    staleTime: 1000 * 60, // cache is fresh for 1 minute
    refetchOnWindowFocus: false,
    retry: 1, // retry once on failure
  });
}
