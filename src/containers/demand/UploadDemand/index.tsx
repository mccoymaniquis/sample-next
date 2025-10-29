"use client";
import type { ReactElement } from "react";

import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import { isAxiosError } from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import type { RootState } from "@/reducers/Store";

import DiscardModal from "@/components/DiscardModal";
import Modal from "@/components/Modal";
import { DEFAULT_BENCH_VALUES, DEFAULT_VALUES } from "@/containers/charts/constants";
import { setHighestBenchBody, setHighestBenchFilters, setHighestDemandBody, setHighestDemandFilters, setLastTouchedBenchFilter, setLastTouchedFilter } from "@/reducers/Charts";
import { setModalVisibility } from "@/reducers/Modal";
import { useUploadDemand } from "@/services/mutations/demand";

import SubmitButton from "./SubmitButton";
import UploadField from "./UploadField";

type UploadFormValues = {
  file: File | null;
  uploadProgress: number;
};

function UploadDemand(): ReactElement {
  const dispatch = useDispatch();
  const open = useSelector((state: RootState) => state.modal.showUploadDemandModal);
  const [hasMounted, setHasMounted] = useState(false);
  const uploadDemand = useUploadDemand();
  const [openDiscardModal, setOpenDiscardModal] = useState(false);

  const methods = useForm<UploadFormValues>({
    mode: "onChange",
    defaultValues: {
      file: null,
      uploadProgress: 0,
    },
  });

  const { handleSubmit, reset } = methods;

  const handleClose = () => {
    dispatch(setModalVisibility({ key: "showUploadDemandModal", value: false }));
  };

  const resetChartFilters = async () => {
    const { year, month, demandLevel: demandLevelOpt } = DEFAULT_VALUES;
    const { demandLevel: demandLevelBenchOpt } = DEFAULT_BENCH_VALUES;

    const date = moment(`${year?.label} ${month?.label}`);
    const startDate = date.startOf("month").format("YYYY-MM-DD") as string;
    const endDate = date.endOf("month").format("YYYY-MM-DD") as string;
    const demandLevel = demandLevelOpt?.label as string;

    dispatch(setHighestDemandFilters({ demandLevel: demandLevelOpt, year, month }));
    dispatch(setHighestBenchFilters({ demandLevel: demandLevelBenchOpt, year, month }));
    dispatch(setHighestDemandBody({ startDate, endDate, demandLevel }));
    dispatch(setHighestBenchBody({ startDate, endDate, demandLevel }));
    dispatch(setLastTouchedBenchFilter(""));
    dispatch(setLastTouchedFilter(""));
  };

  const onSubmit = async (data: UploadFormValues) => {
    try {
      const formData = new FormData();
      if (data.file) {
        formData.append("file", data?.file);
      }

      const result = await uploadDemand.mutateAsync(formData);
      const { status, message } = result;
      if (status === 201) {
        handleClose();
        reset();
        toast.success(message, {
          position: "top-right",
        });
        // dispatch reset filters
        resetChartFilters();
      }
    }
    catch (error: unknown) {
      if (isAxiosError(error)) {
        const message = error.response?.data?.message ?? "Upload failed.";
        toast.error(message, { position: "top-right" });
      }
      else {
        toast.error("An unknown error occurred.", { position: "top-right" });
      }
    }
  };

  const handleOpenDiscard = () => {
    const file = methods.watch("file");
    if (file) {
      setOpenDiscardModal(true);
    }
    else {
      methods.reset();
      dispatch(setModalVisibility({ key: "showUploadDemandModal", value: false }));
    }
  };

  const handleDiscard = () => {
    methods.reset();
    dispatch(setModalVisibility({ key: "showUploadDemandModal", value: false }));
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
    setHasMounted(true);
  }, []);

  if (!hasMounted)
    return <></>;

  return (
    <>
      <FormProvider {...methods}>
        <Modal open={open} onClose={handleClose} width={600} sx={{ px: 2, pt: 2 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Upload Demand</Typography>
            <IconButton onClick={handleClose} size="small">
              <CloseIcon />
            </IconButton>
          </Box>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              pt: 2,
            }}
          >
            <UploadField />
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
                onClick={handleOpenDiscard}
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
        </Modal>
      </FormProvider>
      <DiscardModal
        open={openDiscardModal}
        onClose={() => setOpenDiscardModal(false)}
        onDiscard={handleDiscard}
      />
    </>
  );
}

export default UploadDemand;
