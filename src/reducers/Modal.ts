import type { PayloadAction } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";

export type ModalKey
  = "showDemandDetails"
    | "showDemandFilters"
    | "showComingSoon"
    | "showUploadDemandModal"
    | "showDownloadDemandModal"
    | "showTokenWarningModal"
    | "showSupplyDetails"
    | "showSupplyFilters"
    | "showUploadSupplyModal"
    | "showDownloadSupplyModal"
    | "showReportDownloadModal"
    | "showReportFilters"
    | "showWeeklyDeploymentFilters"
    | "showDownloadWeeklyDeploymentModal"
    | "showAddUserModal"
    | "showUpdateUserModal"
    | "showAboutModal"
    | "showDemandUpdateDetails";
;

type ModalState = Record<ModalKey, boolean>;

const initialState: ModalState = {
  showDemandDetails: false,
  showDemandFilters: false,
  showComingSoon: false,
  showUploadDemandModal: false,
  showDownloadDemandModal: false,
  showTokenWarningModal: false,
  showSupplyDetails: false,
  showSupplyFilters: false,
  showUploadSupplyModal: false,
  showDownloadSupplyModal: false,
  showReportDownloadModal: false,
  showReportFilters: false,
  showWeeklyDeploymentFilters: false,
  showDownloadWeeklyDeploymentModal: false,
  showAddUserModal: false,
  showUpdateUserModal: false,
  showAboutModal: false,
  showDemandUpdateDetails: false,
};

const Modal = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModalVisibility: (
      state,
      action: PayloadAction<{ key: ModalKey; value: boolean }>,
    ) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
  },
});

export const { setModalVisibility } = Modal.actions;
export default Modal.reducer;
