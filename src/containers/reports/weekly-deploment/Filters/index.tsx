import { Box, Button, Typography } from "@mui/material";
import React, { } from "react";
import { useDispatch } from "react-redux";

import DownloadIcon from "@/assets/icons/download.svg";
import FilterIcon from "@/assets/icons/filter_icon.svg";
import { setModalVisibility } from "@/reducers/Modal";

import DownloadReports from "../DownloadReports";
import ModalFilter from "./ModalFilter";

function Filters() {
  const dispatch = useDispatch();

  const handleDownloadReports = async () => {
    dispatch(setModalVisibility({ key: "showDownloadWeeklyDeploymentModal", value: true }));
  };

  const handleOpenFilter = () => {
    dispatch(setModalVisibility({ key: "showWeeklyDeploymentFilters", value: true }));
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
          <Button
            onClick={() => handleDownloadReports()}
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
          <DownloadReports />
        </Box>
      </Box>
      <ModalFilter />
    </>
  );
}

export default Filters;
