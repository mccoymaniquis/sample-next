import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { DemandFormSchema, FilterOptions } from "@/types/demand";

import { paramsToUrl } from "@/helpers";
import { client } from "@/helpers/client";

export async function uploadDemand(formData: FormData): Promise<any> {
  const url = `/v1/batch/demand/uploadXlsx`;
  const headers = {
    "Content-Type": "multipart/form-data",
  };
  const response = await client({
    url,
    method: "POST",
    headers,
    data: formData,
  });
  return response;
}

export function useUploadDemand() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => uploadDemand(formData),
    retry: 0,
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: ["get-demand-list"],
      });
    },
  });
}

export async function downloadDemand(params: FilterOptions): Promise<Blob> {
  const urlEncode = paramsToUrl(params);
  const url = `/v1/demand/downloadExcel?${urlEncode}`;
  const response = await client.get(url, {
    responseType: "blob",
  });

  const blob: Blob = response?.data ?? response;

  if (!(blob instanceof Blob)) {
    throw new TypeError("Response is not a valid Blob.");
  }

  return blob;
}

export function useDownloadDemand() {
  return useMutation({
    mutationFn: (params: FilterOptions) => downloadDemand(params),
    retry: 0,
  });
}

// API Call
export async function updateDemand(params: DemandFormSchema): Promise<void> {
  const url = `/v1/demand/${params.id}`;
  const response = await client({
    url,
    method: "PUT",
    data: params,
  });
  return response.data;
}

// Hook
export function useUpdateDemand() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateDemand,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-demand-list"] });
    },
    onError: (error) => {
      console.error("Error updating user:", error);
    },
  });
}
