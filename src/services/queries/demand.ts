import { useQuery } from "@tanstack/react-query";

import type { FilterOptions, GetDemandResponse } from "@/types/demand";

import { paramsToUrl } from "@/helpers";
import { client } from "@/helpers/client";

async function getDemandList(params: FilterOptions): Promise<GetDemandResponse> {
  const urlEncode = paramsToUrl(params);
  const url = `/v1/demand/all?${urlEncode}`;
  const headers = {};
  return client({
    url,
    method: "GET",
    headers,
  }).then((response) => {
    return response.data;
  });
}

export function useGetDemandList(params: FilterOptions) {
  return useQuery({
    queryKey: ["get-demand-list", params],
    queryFn: () => getDemandList(params),
    networkMode: "online",
  });
}
