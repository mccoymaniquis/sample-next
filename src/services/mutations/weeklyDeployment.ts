import { useMutation } from "@tanstack/react-query";

// import type { FilterOptions } from "@/types/demand";
import { paramsToUrl } from "@/helpers";
import { client } from "@/helpers/client";

export type FilterOptions = {
  startDate?: string;
  endDate?: string;
  frequency?: string;
  roleFamily?: string;
  careerLevel?: number;
};

export async function downloadWeeklyDeployments(params: FilterOptions): Promise<Blob> {
  const urlEncode = paramsToUrl(params);
  const url = `/v1/supply_demand/downloadWeeklyDeploymentReportExcelFile?${urlEncode}`;
  const response = await client.get(url, {
    responseType: "blob",
  });

  const blob: Blob = response?.data ?? response;

  if (!(blob instanceof Blob)) {
    throw new TypeError("Response is not a valid Blob.");
  }

  return blob;
}

export function useDownloadWeeklyDeployments() {
  return useMutation({
    mutationFn: (params: FilterOptions) => downloadWeeklyDeployments(params),
    retry: 0,
  });
}
