"use client";
import type { ReactElement } from "react";

import { Box, Button, Typography } from "@mui/material";
import React from "react";

import Modal from "@/components/Modal";

export type ConfirmationModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  status?: string;
};

export function UserConfirmatioModal(props: ConfirmationModalProps): ReactElement {
  const { open, onClose, status, onSubmit } = props;

  return (
    <Modal open={open} onClose={onClose} width={620} sx={{ py: 5, px: 5 }}>
      <Box display="flex" flexDirection="column" alignItems="center" textAlign="center" gap={5}>
        <Typography variant="h6" fontWeight={600} fontSize={18}>
          {`Are you sure you want to ${status} this user?`}
        </Typography>

        <Box display="flex" width="100%" gap={2}>
          <Button
            fullWidth
            onClick={onClose}
            sx={{
              "height": 44,
              "backgroundColor": "#DD2629",
              "color": "#fff",
              "borderRadius": "8px",
              "fontWeight": 500,
              "textTransform": "none",
              "&:hover": {
                backgroundColor: "#c52225",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            fullWidth
            onClick={onSubmit}
            sx={{
              "height": 44,
              "border": "1.5px solid #407CF1",
              "color": "#407CF1",
              "borderRadius": "8px",
              "fontWeight": 500,
              "textTransform": "none",
              "&:hover": {
                backgroundColor: "#f3f7ff",
                borderColor: "#2f6ae3",
              },
            }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default UserConfirmatioModal;
