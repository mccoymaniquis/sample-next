"use client";
import type { ReactElement } from "react";

import { Box, Button, Typography } from "@mui/material";
import React from "react";

import Modal from "@/components/Modal";

export type DiscardModalType = {
  open: boolean;
  onClose: () => void;
  onDiscard: () => void;
  title?: string;
  message?: string;
};
export function DiscardModal(props: DiscardModalType): ReactElement {
  const { open, onClose, onDiscard, title, message } = props;

  const discard = () => {
    if (onDiscard)
      onDiscard();
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} width={620} sx={{ py: 6, px: 8 }}>
      <Box>
        <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column", gap: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: 18 }}>
            {title ?? "Are you sure you want to cancel upload?"}
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 400, fontSize: 16 }}>
            {message ?? "Any changes you've made will not be saved."}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" mt={4}>
          <Button
            onClick={onClose}
            sx={{
              mr: 1,
              width: "100%",
              background: "#fff",
              borderRadius: "8px",
              padding: "3px",
              backgroundImage: "linear-gradient(white, white), linear-gradient(90deg, #16D1D3, #1C47A5)",
              backgroundClip: "content-box, border-box",
            }}
          >
            Continue Editing
          </Button>
          <Button
            onClick={discard}
            sx={{
              "background": "#DD2629",
              "borderRadius": "8px",
              "padding": "3px",
              "height": "44px",
              "width": "100%",
              "color": "#fff",
              "&:hover": {
                opacity: 0.8,
                background: "#DD2629",
              },
            }}
          >
            Discard
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default DiscardModal;
