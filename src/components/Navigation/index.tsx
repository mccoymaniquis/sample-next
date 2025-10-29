"use client";
import { Box } from "@mui/material";
import React from "react";

import NavigationTab from "./NavigationTab";
import Profile from "./Profile";
import Title from "./Title";

function Navigation() {
  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingX: 3,
        height: 70,
        background: "linear-gradient(90deg, #407CF1 0%, #1C47A5 100%)",
        color: "#FFF",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Title />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
        <NavigationTab />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Profile />
      </Box>
    </Box>
  );
}

export default Navigation;
