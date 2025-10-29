"use client";
import type { ReactElement } from "react";

import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "@/reducers/Store";

import { setModalVisibility } from "@/reducers/Modal";

function ViewModal(): ReactElement {
  const dispatch = useDispatch();
  const open = useSelector((state: RootState) => state.modal.showSupplyDetails);
  const data = useSelector((state: RootState) => state.supply.activeSupply);

  const handleClose = () => {
    dispatch(setModalVisibility({ key: "showSupplyDetails", value: false }));
  };

  if (!data)
    return <></>;

  const
    { startDate, endDate, name, roleFamily, careerLevel, headCount } = data;

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Supply Details</Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid container direction="column" spacing={0}>
          {[
            ["Start Date", startDate],
            ["End Date", endDate],
            ["Name", name],
            ["Role Family", roleFamily],
            ["Career Level", careerLevel],
            ["Head Count", headCount],

          ].map(([label, value], index) => (
            <Grid
              container
              key={label}
              sx={{
                backgroundColor: index % 2 === 0 ? "#E3EDFF" : "transparent",
                padding: 2,
              }}
            >
              <Grid item xs={4}>
                <Typography fontWeight="bold">{label}</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography>{value}</Typography>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Box sx={{
          display: "flex",
          justifyContent: "flex-end",
          m: 2,
        }}
        >
          <Button
            onClick={handleClose}
            sx={{
              background: "#fff",
              borderRadius: "8px",
              padding: "3px",
              backgroundImage: "linear-gradient(white, white), linear-gradient(90deg, #16D1D3, #1C47A5)",
              backgroundClip: "content-box, border-box",
              height: "44px",
              width: "93px",
            }}
          >
            Close
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}

export default ViewModal;
