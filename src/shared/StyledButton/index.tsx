import { Button, Typography } from "@mui/material";
import React from "react";

import { BTN_ICON_SIZES, BTN_STYLE, ICONS, typographyStyle } from "./constants";

type StyleButton = {
  variant: "upload" | "download" | "none";
  handleOnClick: () => void;
  children?: string;
  disabled?: boolean;
};

function StyledButton({ variant, children, handleOnClick, ...props }: StyleButton) {
  const BtnIcon = ICONS[variant] ?? <></>;

  return (
    <Button
      {...props}
      onClick={() => handleOnClick()}
      sx={BTN_STYLE}
    >
      {variant !== "none" && <BtnIcon style={BTN_ICON_SIZES[variant]} />}
      <Typography sx={typographyStyle}>
        {children}
      </Typography>
    </Button>
  );
}

export default StyledButton;
