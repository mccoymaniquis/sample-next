import { Box, Typography } from "@mui/material";
import React from "react";

import HeaderIcon from "@/assets/navigation/finance_mode.svg";

function Title() {
  return (
    <Box
      sx={{
        pr: 4,
        width: 220,
        fontWeight: 700,
        textTransform: "uppercase",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "16px",
      }}
    >
      <HeaderIcon className="w-[50px] h-[50px]" />
      <Typography sx={{
        fontSize: "14px",
        fontWeight: 700,
        color: "#FFFFFF",
        ml: 1,
      }}
      >
        Supply Demand Forecast
      </Typography>
    </Box>
  );
}

export default Title;
