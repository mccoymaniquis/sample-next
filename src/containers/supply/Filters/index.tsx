import { Box, Button } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "@/reducers/Store";

import FilterIcon from "@/assets/icons/filter_icon.svg";
import { DownloadTemplate } from "@/components/Buttons";
import SearchTextField from "@/components/SearchField";
import { hasPermission } from "@/helpers/permissionUtils";
import { setModalVisibility } from "@/reducers/Modal";
import StyledButton from "@/shared/StyledButton";

import { BTN_FILTER_STYLE, EXCEL_HEADERS, FILTER_CONTAINER_STYLE } from "../constants";
import DownloadSupply from "../DownloadSupply";
import UploadSupply from "../UploadSupply";
import ModalFilter from "./ModalFilter";

type Filters = {
  isEdit: boolean;
  isEditing: boolean;
  onEditColumns: () => void;
  onCancelEdit: () => void;
  onSaveEdit: () => void;
  enableSaveButton: boolean;
};

function Filters(props: Filters) {
  const { isEdit, isEditing, onEditColumns, onCancelEdit, onSaveEdit, enableSaveButton } = props;
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state?.user?.user);
  const hasEditAccess = hasPermission(user, "supply-edit");

  const handleOpenFilter = () => {
    dispatch(setModalVisibility({ key: "showSupplyFilters", value: true }));
  };

  const handleUploadSupply = () => {
    dispatch(setModalVisibility({ key: "showUploadSupplyModal", value: true }));
  };

  const handleDownloadSupply = () => {
    dispatch(setModalVisibility({ key: "showDownloadSupplyModal", value: true }));
  };

  return (
    <>
      <Box className="filter-container" sx={FILTER_CONTAINER_STYLE}>
        <Box sx={{ width: "420px", maxWidth: "100%" }}>
          <SearchTextField name="search" label="search" disabled={isEditing} />
        </Box>
        <Box sx={{ display: "flex", width: "100%", justifyContent: "flex-end", gap: 1 }}>
          {(hasEditAccess && isEdit && !isEditing) && (
            <StyledButton variant="none" handleOnClick={() => onEditColumns()}>
              Edit
            </StyledButton>
          )}

          {(hasEditAccess && isEdit && isEditing) && (
            <>
              <StyledButton variant="none" handleOnClick={() => onCancelEdit()}>
                Cancel
              </StyledButton>
              <StyledButton disabled={!enableSaveButton} variant="none" handleOnClick={() => onSaveEdit()}>
                Save
              </StyledButton>
            </>
          )}
          {
            (!isEditing) && (
              <Button
                onClick={() => handleOpenFilter()}
                sx={BTN_FILTER_STYLE}
              >
                <FilterIcon style={{ width: 28, height: 28 }} />
              </Button>
            )
          }
          {
            hasEditAccess && (!isEditing) && (
              <>
                <Box minWidth="70px">
                  <DownloadTemplate
                    templateName="SupplyList_Template.xlsx"
                    headers={EXCEL_HEADERS}
                  />
                </Box>
                <StyledButton variant="download" handleOnClick={() => handleDownloadSupply()}>
                  Download
                </StyledButton>
                <StyledButton variant="upload" handleOnClick={() => handleUploadSupply()}>
                  Upload
                </StyledButton>
              </>
            )
          }
        </Box>
      </Box>
      <ModalFilter />
      <DownloadSupply />
      <UploadSupply />
    </>
  );
}

export default Filters;
