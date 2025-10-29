import { Box } from "@mui/material";
import React from "react";

import CustomCard from "@/components/CustomCard";

import { backgroundStyles, containerStyles } from "../constants";

type Card = {
  children: React.ReactNode;
};

const Layout: React.FC<Card> = ({ children }) => {
  return (
    <Box className="background" sx={backgroundStyles}>
      <CustomCard>
        <Box
          className="container"
          sx={containerStyles}
        >
          <>{children}</>
        </Box>
      </CustomCard>
    </Box>
  );
};

export default Layout;
