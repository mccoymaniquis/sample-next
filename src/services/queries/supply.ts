import { useQuery } from "@tanstack/react-query";

import type { FilterOptions, GetSupplyResponse } from "@/types/supply";

import { paramsToUrl } from "@/helpers";
import { client } from "@/helpers/client";

async function getSupplyList(params: FilterOptions): Promise<GetSupplyResponse> {
  const urlEncode = paramsToUrl(params);
  const url = `/v1/supply/all?${urlEncode}`;
  const headers = {};
  return client({
    url,
    method: "GET",
    headers,
  }).then((response) => {
    return response.data;
  });
}

export function useGetSupplyList(params: FilterOptions) {
  return useQuery({
    queryKey: ["get-supply-list", params],
    queryFn: () => getSupplyList(params),
    networkMode: "online",
  });
}
