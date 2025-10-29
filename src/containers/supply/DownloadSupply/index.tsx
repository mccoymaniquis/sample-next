"use client";
import type { ReactElement } from "react";

import {
  Box,
  Button,
  Typography,
} from "@mui/material";
import { isAxiosError } from "axios";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import type { RootState } from "@/reducers/Store";

import Modal from "@/components/Modal";
import { formatDate, parseDate } from "@/helpers/dateTime";
import { downloadBlob } from "@/helpers/downloadBlob";
import { setModalVisibility } from "@/reducers/Modal";
import { useDownloadSupply } from "@/services/mutations/supply";

import SubmitButton from "./SubmitButton";

function DownloadDemand(): ReactElement {
  const dispatch = useDispatch();
  const open = useSelector((state: RootState) => state.modal.showDownloadSupplyModal);
  const filters = useSelector((state: RootState) => state.supply.supplyFilters);

  const [hasMounted, setHasMounted] = useState(false);
  const downloadSupply = useDownloadSupply();
  const methods = useForm({
    defaultValues: {},
  });

  const { handleSubmit, reset } = methods;

  const handleClose = () => {
    dispatch(setModalVisibility({ key: "showDownloadSupplyModal", value: false }));
  };

  const onSubmit = async () => {
    try {
      const response = await downloadSupply.mutateAsync({
        roleFamily: _.get(filters, "roleFamilyFilter.label", "") as string,
        careerLevel: _.get(filters, "careerLevelFilter.label", "") as string,
        startDate: formatDate({ value: parseDate(filters?.startDateFilter) }) ?? undefined,
        endDate: formatDate({ value: parseDate(filters?.endDateFilter) }) ?? undefined,
        search: filters?.search ?? undefined,
      });

      downloadBlob({
        blob: response,
        fileName: "supply_list.xlsx",
      });

      toast.success("Successfully downloaded file!", { position: "top-right" });
      handleClose();
      reset();
    }
    catch (error: unknown) {
      console.error("Error downloading demand list:", error);
      if (isAxiosError(error)) {
        const message = error.response?.data?.message ?? "Upload failed.";
        toast.error(message, { position: "top-right" });
      }
      else {
        toast.error("An unknown error occurred.", { position: "top-right" });
      }
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
    setHasMounted(true);
  }, []);

  if (!hasMounted)
    return <></>;

  return (
    <Modal open={open} onClose={handleClose} width={600} sx={{ px: 2, pt: 4, pb: 2 }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "center" }}>
        <Typography
          variant="h6"
          sx={{
            size: 18,
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          Are you sure you want to download Supply list?
        </Typography>
        <FormProvider {...methods}>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >

            {/* <UploadField /> */}
            <Typography sx={{ fontSize: 16, lineHeight: 1.5, textAlign: "center" }}>
              <Box component="span" sx={{ color: "#DD2629" }}>Please take note: </Box>
              <Box component="span" sx={{ color: "#262626" }}>The downloaded file will reflect only the currently filtered table data. To download all records, ensure that all filters are cleared beforehand.</Box>
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                m: 2,
                gap: 2,
                pt: 2,
              }}
            >
              <Button
                onClick={handleClose}
                sx={{
                  "background": "#fff",
                  "borderRadius": "8px",
                  "padding": "3px",
                  "backgroundImage": "linear-gradient(white, white), linear-gradient(90deg, #16D1D3, #1C47A5)",
                  "backgroundClip": "content-box, border-box",
                  "height": "44px",
                  "width": "100%",
                  "&:hover": {
                    background: "#fff",
                    opacity: 0.8,
                    backgroundImage: "linear-gradient(white, white), linear-gradient(90deg, #16D1D3, #1C47A5)",
                    backgroundClip: "content-box, border-box",
                  },
                }}
              >
                Cancel
              </Button>
              <SubmitButton />
            </Box>
          </Box>
        </FormProvider>
      </Box>
    </Modal>
  );
}

export default DownloadDemand;
