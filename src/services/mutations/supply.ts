import { useMutation, useQueryClient } from "@tanstack/react-query";

import { paramsToUrl } from "@/helpers";
import { client } from "@/helpers/client";

export async function uploadSupply(formData: FormData): Promise<any> {
  const url = `/v1/batch/supply/uploadXlsx`;
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

export function useUploadSupply() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => uploadSupply(formData),
    retry: 0,
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: ["get-supply-list"],
      });
    },
  });
}

export async function downloadSupply(params: any): Promise<Blob> {
  const urlEncode = paramsToUrl(params);
  const url = `/v1/supply/downloadExcel?${urlEncode}`;
  const response = await client.get(url, {
    responseType: "blob",
  });

  const blob: Blob = response?.data ?? response;

  if (!(blob instanceof Blob)) {
    throw new TypeError("Response is not a valid Blob.");
  }

  return blob;
}

export function useDownloadSupply() {
  return useMutation({
    mutationFn: (params: any) => downloadSupply(params),
    retry: 0,
  });
}

export async function updateSupplyList(body: any): Promise<any> {
  const url = "/v1/supply/list";
  const response = await client({
    url,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
  });

  return response;
}
