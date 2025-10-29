"use client";
import type { ReactElement } from "react";

import {
  Box,
  Button,
  Typography,
} from "@mui/material";
import { isAxiosError } from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import type { RootState } from "@/reducers/Store";

import Modal from "@/components/Modal";
import { downloadBlob } from "@/helpers/downloadBlob";
import { setModalVisibility } from "@/reducers/Modal";
import { useDownloadWeeklyDeployments } from "@/services/mutations/weeklyDeployment";

import SubmitButton from "./SubmitButton";

function DownloadReports(): ReactElement {
  const dispatch = useDispatch();
  const { watch } = useFormContext();
  const open = useSelector((state: RootState) => state.modal.showDownloadWeeklyDeploymentModal);
  const [hasMounted, setHasMounted] = useState(false);
  const downloadReports = useDownloadWeeklyDeployments();

  const roleFamilyFilter = watch("roleFamilyFilter");
  const careerLevelFilter = watch("careerLevelFilter");
  const startDateFilter = watch("startDateFilter");
  const endDateFilter = watch("endDateFilter");

  const params = {
    startDate: moment(startDateFilter).format("YYYY-MM-DD"),
    endDate: moment(endDateFilter).format("YYYY-MM-DD"),
    roleFamily: roleFamilyFilter?.id === "" ? null : roleFamilyFilter?.id,
    careerLevel: careerLevelFilter?.id === "" ? null : careerLevelFilter?.id,
  };

  const methods = useForm({
    defaultValues: {
    },
  });

  const { handleSubmit, reset } = methods;

  const handleClose = () => {
    dispatch(setModalVisibility({ key: "showDownloadWeeklyDeploymentModal", value: false }));
  };

  const onSubmit = async () => {
    try {
      const dateToday = new Date();
      const response = await downloadReports.mutateAsync(params);
      const blob = {
        blob: response,
        fileName: `Weekly Deployment Report_${moment(dateToday).format("YYYY-MM-DD")}`,
      };
      downloadBlob(blob);

      toast.success("Successfully downloaded file!", { position: "top-right" });
      handleClose();
      reset();
    }
    catch (error: unknown) {
      console.error("Error downloading report list:", error);
      if (isAxiosError(error)) {
        const message = error.response?.data?.message ?? "Download failed. Please try again later.";
        toast.error(
          <Box
            sx={{
              display: "flex",
              justifyContent: "start",
              alignItems: "start",
              gap: 2,
              width: "100%",
              flexDirection: "column",
            }}
          >
            <Typography>{message}</Typography>
            <Button
              variant="text"
              sx={{
                "color": "#fff",
                "padding": 0,
                "minWidth": "auto",
                "textAlign": "start",
                "&:hover": {
                  opacity: 0.8,
                  background: "none",
                  textDecoration: "underline",
                },
              }}
              onClick={async () => {
                toast.dismiss();
                await onSubmit();
              }}
            >
              Retry
            </Button>
          </Box>,
          {
            style: {
              backgroundColor: "#e53935", // or your red tone
              color: "#fff",
            },
          },
        );
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
          Are you sure you want to download Reports?
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

export default DownloadReports;
