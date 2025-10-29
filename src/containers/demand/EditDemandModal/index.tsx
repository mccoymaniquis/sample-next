import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import type { RootState } from "@/reducers/Store";
import type { DemandForm } from "@/types/demand";

import Modal from "@/components/Modal";
import { setModalVisibility } from "@/reducers/Modal";
import { useUpdateDemand } from "@/services/mutations/demand";
import { demandFormSchema } from "@/validation/demandSchema";

import AllocationField from "./AllocationField";
import Cancel from "./Cancel";
import CareerLevelField from "./CareerLevelField";
import ClientField from "./ClientField";
import CommitLevelField from "./CommitLevelField";
import EndDateField from "./EndDateField";
import OpptyFunnelField from "./OpptyFunnelField";
import OpptyNumberField from "./OpptyNumberField";
import OriginalHCField from "./OriginalHCField";
import ProbabilityField from "./ProbabilityField";
import ProjectEndDateField from "./ProjectEndDateField";
import ProjectNameField from "./ProjectNameField";
import ProjectStartDateField from "./ProjectStartDateField";
import ResourceNameField from "./ResourceNameField";
import RoleFamilyField from "./RoleFamilyField";
import SoTagField from "./SoTagField";
import StartDateField from "./StartDateField";
import Submit from "./Submit";

const DEFAULT_VALUES = {
  client: "",
  projectName: "",
  roleFamily: {
    id: "",
    label: "",
  },
  careerLevel: {
    id: "",
    label: "",
  },
  allocation: "",
  startDate: null,
  endDate: null,
  commitLevel: {
    id: "",
    label: "",
  },
  opptyFunnel: "",
  soTag: "",
  opptyNumber: "",
  originalHC: "",
  probability: "",
  resourceName: "",
  projectStartDate: null,
  projectEndDate: null,
};

function EditDemandModal() {
  const dispatch = useDispatch();
  const updateDemand = useUpdateDemand();

  const methods = useForm<DemandForm>({
    resolver: zodResolver(demandFormSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onChange",
  });

  const open = useSelector((state: RootState) => state.modal.showDemandUpdateDetails);
  const activeDemand = useSelector((state: RootState) => state.demand.activeDemand);
  const id = activeDemand?.id;

  useEffect(() => {
    if (activeDemand) {
      methods.reset({
        client: activeDemand.client || "",
        projectName: activeDemand.projectName || "",
        roleFamily: {
          id: String(activeDemand.roleFamily) || "",
          label: activeDemand.roleFamily || "",
        },
        careerLevel: {
          id: String(activeDemand.careerLevel) || "",
          label: String(activeDemand.careerLevel) || "",
        },
        allocation: String(activeDemand.allocation) || "",
        startDate: activeDemand.startDate ? new Date(activeDemand.startDate) : undefined,
        endDate: activeDemand.endDate ? new Date(activeDemand.endDate) : undefined,
        commitLevel: {
          id: String(activeDemand.opptyTagging) || "",
          label: String(activeDemand.opptyTagging) || "",
        },
        opptyFunnel: activeDemand.opptyFunnel || "",
        soTag: activeDemand.soTag || "",
        opptyNumber: activeDemand.opptyNumber || "",
        originalHC: String(activeDemand.originalHC) || "",
        probability: String(activeDemand.probability) || "",
        resourceName: activeDemand.resourceName || "",
        projectStartDate: activeDemand.projectStartDate ? new Date(activeDemand.projectStartDate) : undefined,
        projectEndDate: activeDemand.projectEndDate ? new Date(activeDemand.projectEndDate) : undefined,
      });
    }
  }, [activeDemand, methods]);

  const onClose = () => {
    methods.reset();
    dispatch(setModalVisibility({ key: "showDemandUpdateDetails", value: false }));
  };

  const onSubmit = async (data: DemandForm) => {
    try {
      if (typeof id !== "number") {
        throw new TypeError("Demand ID is missing or invalid.");
      }
      const updatedData = {
        ...data,
        id,
        roleFamily: data.roleFamily?.label || "",
        careerLevel: data.careerLevel?.label || "",
        commitLevel: data.commitLevel?.label || "",
        opptyTagging: data?.commitLevel?.label || "",
      };
      await updateDemand.mutateAsync(updatedData);
      toast.success("Saved successfully.", { position: "top-right" });
      methods.reset();
      dispatch(setModalVisibility({ key: "showDemandUpdateDetails", value: false }));
    }
    catch (error: any) {
      const message = error?.response?.data?.message || "An unexpected error occurred.";
      console.error("Error updating demand:", message);
      toast.error(message, { position: "top-right" });
    }
  };

  return (
    <Modal open={open} width={1200} onClose={onClose} disableAutoFocus={false} title="Edit Demand List">
      <FormProvider {...methods}>
        <Box component="form" onSubmit={methods.handleSubmit(onSubmit)}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              mb: 3,
            }}
          >
            <Box sx={{ display: "flex", gap: 2 }}>
              <ClientField />
              <ProjectNameField />
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <RoleFamilyField />
              <CareerLevelField />
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <AllocationField />
              <CommitLevelField />
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <StartDateField />
              <EndDateField />
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <OpptyFunnelField />
              <SoTagField />
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <OpptyNumberField />
              <OriginalHCField />
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <ProbabilityField />
              <ResourceNameField />
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <ProjectStartDateField />
              <ProjectEndDateField />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
              mt: 3,
            }}
          >
            <Cancel methods={methods} />
            <Submit />
          </Box>
        </Box>
      </FormProvider>
    </Modal>
  );
}

export default EditDemandModal;
