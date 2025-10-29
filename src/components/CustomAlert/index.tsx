import type { SvgIconProps } from "@mui/material";

import CheckIcon from "@mui/icons-material/Check";
import WarningIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";
import Alert from "@mui/material/Alert";
import React from "react";

export type AlertColor = "error" | "info" | "success" | "warning";

export type AlertOption = {
  variant: AlertColor;
  message: string;
  show?: boolean;
};

const Icons: Record<AlertColor, React.ComponentType<SvgIconProps>> = {
  success: CheckIcon,
  error: WarningIcon,
  info: InfoIcon,
  warning: WarningIcon,
};

type CustomAlert = {
  close?: () => void;
  option: AlertOption;
  show?: boolean;
};

const ChangePassword: React.FC<CustomAlert> = ({ option, close }) => {
  const AlertIcon = Icons[option.variant];

  const handleClose = () => {
    if (typeof close === "function") {
      close();
    }
  };

  return (
    <Alert
      icon={<AlertIcon fontSize="inherit" />}
      severity={option.variant}
      onClose={close ? handleClose : undefined}
    >
      {option.message}
    </Alert>
  );
};

export default ChangePassword;
