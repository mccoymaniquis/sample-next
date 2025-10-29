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
import moment from "moment";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "@/reducers/Store";

import { setModalVisibility } from "@/reducers/Modal";

function ViewModal(): ReactElement {
  const dispatch = useDispatch();
  const open = useSelector((state: RootState) => state.modal.showDemandDetails);
  const data = useSelector((state: RootState) => state.demand.activeDemand);

  const handleClose = () => {
    dispatch(setModalVisibility({ key: "showDemandDetails", value: false }));
  };

  if (!data)
    return <></>;

  const
    { client, projectName, roleFamily, careerLevel, allocation, startDate, endDate, opptyTagging, opptyFunnel, originalHC, probability, resourceName, soTag, opptyNumber, projectStartDate, projectEndDate } = data;

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Demand Details</Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid container direction="column" spacing={0}>
          {[
            ["Client", client],
            ["Project Name", projectName],
            ["Role Family", roleFamily],
            ["Career Level", careerLevel],
            ["Allocation", allocation],
            ["Start Date", moment(startDate).format("YYYY-MM-DD")],
            ["End Date", moment(endDate).format("YYYY-MM-DD")],
            ["Commit Level", opptyTagging],
            ["Oppty Funnel", opptyFunnel],
            ["SO Tag", soTag],
            ["Oppty Number", opptyNumber],
            ["Original HC", originalHC],
            ["Probability", probability],
            ["Resource Name", resourceName],
            ["Project Start Date", moment(projectStartDate).format("YYYY-MM-DD")],
            ["Project End Date", moment(projectEndDate).format("YYYY-MM-DD")],
          ].map(([label, value], index) => (
            <Grid
              container
              key={String(label)}
              sx={{
                backgroundColor: index % 2 === 0 ? "#E3EDFF" : "transparent",
                padding: 2,
              }}
            >
              <Grid item xs={4}>
                <Typography fontWeight="bold">{String(label)}</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography>{String(value)}</Typography>
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
