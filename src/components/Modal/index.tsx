"use client";
import type { SxProps, Theme } from "@mui/material/styles";

import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Modal as CustomModal,
  IconButton,
  Typography,
} from "@mui/material";
import * as React from "react";

type ModalProps = {
  children: React.ReactNode;
  open: boolean;
  onClose?: (e: React.SyntheticEvent) => void;
  width?: number;
  disableAutoFocus?: boolean;
  sx?: SxProps<Theme>;
  title?: string | React.ReactNode;
  noMarginBottom?: boolean;
};

const Modal: React.FC<ModalProps> = ({
  open,
  children,
  onClose,
  disableAutoFocus,
  width = 600,
  sx,
  title,
  noMarginBottom = false,
}) => {
  const style: SxProps<Theme> = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: {
      xs: "90vw",
      sm: "80vw",
      md: width,
    },
    bgcolor: "background.paper",
    border: "0px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 2,
    pb: 3,
    borderRadius: "8px",
    ...(sx || {}),
  };

  // Wrapper to prevent closing on backdrop click
  const handleClose = (
    event: object,
    reason: "backdropClick" | "escapeKeyDown",
  ) => {
    if (reason === "backdropClick")
      return; // Ignore outside clicks
    if (onClose)
      onClose(event as React.SyntheticEvent);
  };

  return (
    <CustomModal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      disableAutoFocus={disableAutoFocus}
    >
      <Box sx={style}>
        {title && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: noMarginBottom ? 0 : 2,
            }}
          >
            <Typography variant="h6" id="modal-title" style={{ fontWeight: 700 }}>
              {title}
            </Typography>
            <IconButton onClick={onClose} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        )}
        {children}
      </Box>
    </CustomModal>
  );
};

export default Modal;
