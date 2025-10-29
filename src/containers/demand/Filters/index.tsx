import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "@/reducers/Store";

import DownloadIcon from "@/assets/icons/download.svg";
import FilterIcon from "@/assets/icons/filter_icon.svg";
import UploadIcon from "@/assets/icons/upload.svg";
import { DownloadTemplate } from "@/components/Buttons";
import { hasPermission } from "@/helpers/permissionUtils";
import { setModalVisibility } from "@/reducers/Modal";

import DownloadDemand from "../DownloadDemand";
import UploadDemand from "../UploadDemand";
import ModalFilter from "./ModalFilter";
import SearchField from "./SearchField";

const EXCEL_HEADERS = [
  "Project",
  "Role",
  "CL",
  "Allocation",
  "Start Date",
  "End Date",
  "Oppty Tagging",
  "Oppty Funnel",
  "SO Tag",
  "Oppty #",
  "Original HC",
  "Probability",
  "Resource Name",
  "Client",
  "Project Start Date",
  "Project End Date",
];

function Filters() {
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state?.user?.user);

  const hasEditAccess = hasPermission(user, "demand-edit");

  const handleOpenFilter = () => {
    dispatch(setModalVisibility({ key: "showDemandFilters", value: true }));
  };

  const handleUploadDemand = () => {
    dispatch(setModalVisibility({ key: "showUploadDemandModal", value: true }));
  };

  const handleDownloadDemand = () => {
    dispatch(setModalVisibility({ key: "showDownloadDemandModal", value: true }));
  };
  return (
    <>
      <Box sx={{
        display: "flex",
        flexDirection: {
          xs: "column", // mobile
          sm: "row", // tablet and up
        },
        gap: {
          xs: 2,
          sm: 2,
        },
        py: {
          xs: 2,
          sm: 2,
          md: 3,
        },
        alignItems: {
          xs: "stretch",
          sm: "center",
        },
      }}
      >
        <Box sx={{ width: "420px", maxWidth: "100%" }}>
          <SearchField />
        </Box>

        <Box sx={{ display: "flex", width: "100%", justifyContent: "flex-end", gap: 1 }}>
          <Button
            onClick={() => handleOpenFilter()}
            sx={{
              background: "#fff",
              borderRadius: "8px",
              padding: "3px",
              backgroundImage: "linear-gradient(white, white), linear-gradient(90deg, #16D1D3, #1C47A5)",
              backgroundClip: "content-box, border-box",
              height: "40px",
              width: "40px",
              minWidth: "40px",
            }}
          >
            <FilterIcon style={{ width: 28, height: 28 }} />
          </Button>
          {
            hasEditAccess && (
              <>
                <Box minWidth="70px">
                  <DownloadTemplate
                    templateName="DemandList_Template.xlsx"
                    headers={EXCEL_HEADERS}
                  />
                </Box>
                <Button
                  onClick={() => handleDownloadDemand()}
                  sx={{
                    "background": "linear-gradient(90deg, #16D1D3 0%, #407CF1 50%, #1C47A5 100%)",
                    "color": "#fff",
                    "px": 2,
                    "borderRadius": "8px",
                    "height": "40px",
                    "&:hover": {
                      background: "linear-gradient(90deg, #16D1D3 0%, #407CF1 50%, #1C47A5 100%)",
                      opacity: 0.8,
                    },
                  }}
                >
                  <DownloadIcon style={{ width: 28, height: 28, marginLeft: 1 }} />
                  <Typography
                    sx={{
                      pl: 1,
                      fontSize: {
                        xs: 14,
                        md: 16,
                      },
                      marginRight: 1,
                    }}
                  >
                    Download
                  </Typography>
                </Button>
                <Button
                  onClick={() => handleUploadDemand()}
                  sx={{
                    "background": "linear-gradient(90deg, #16D1D3 0%, #407CF1 50%, #1C47A5 100%)",
                    "color": "#fff",
                    "px": 2,
                    "borderRadius": "8px",
                    "height": "40px",
                    "&:hover": {
                      background: "linear-gradient(90deg, #16D1D3 0%, #407CF1 50%, #1C47A5 100%)",
                      opacity: 0.8,
                    },
                  }}
                >
                  <UploadIcon style={{ width: 20, height: 20, marginLeft: 1 }} />
                  <Typography
                    sx={{
                      pl: 1,
                      fontSize: {
                        xs: 14,
                        md: 16,
                      },
                      marginRight: 1,
                    }}
                  >
                    Upload
                  </Typography>
                </Button>
              </>
            )
          }

        </Box>
      </Box>
      <ModalFilter />
      <UploadDemand />
      <DownloadDemand />
    </>
  );
}

export default Filters;
