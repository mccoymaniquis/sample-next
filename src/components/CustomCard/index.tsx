"use client";

import { Box } from "@mui/material";
import React from "react";

type Card = {
  children: React.ReactNode;
};

const customCardStyles = {
  background: "#fff",
  height: "auto",
  marginTop: 5,
  marginBottom: 5,
  display: "flex",
  flexDirection: {
    xs: "column",
    sm: "row",
  },
  borderRadius: "12px",
  overflow: "hidden",
};

const CustomCard: React.FC<Card> = ({ children }) => {
  return (
    <Box
      className="custom-card"
      sx={customCardStyles}
    >
      <>{children}</>
    </Box>
  );
};

export default CustomCard;
