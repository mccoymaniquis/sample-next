"use client";
import type { SxProps, Theme } from "@mui/material/styles";

import { Box, Modal as CustomModal } from "@mui/material";
import * as React from "react";

type ModalProps = {
  children: React.ReactNode;
  open: boolean;
  onClose?: (e: React.SyntheticEvent) => void;
  width?: number;
  disableAutoFocus?: boolean;
  sx?: SxProps<Theme>;
};

const ComingSoonModal: React.FC<ModalProps> = ({
  open,
  children,
  onClose,
  disableAutoFocus,
  width = 600,
  sx,
}) => {
  const style: SxProps<Theme> = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: {
      xs: "90vw", // full width on mobile
      sm: "80vw", // medium width on tablets
      md: width, // fixed width on desktop
    },
    bgcolor: "background.paper",
    border: "0px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    borderRadius: "8px",
    ...(sx || {}),
  };

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
      disableAutoFocus={disableAutoFocus}
    >
      <Box sx={style}>{children}</Box>
    </CustomModal>
  );
};

export default ComingSoonModal;
