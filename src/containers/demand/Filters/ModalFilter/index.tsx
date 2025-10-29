"use client";
import type { ReactElement } from "react";

import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "@/reducers/Store";

import { setModalVisibility } from "@/reducers/Modal";

import CareerLevelField from "./CareerLevelField";
import EndDateField from "./EndDateField";
import OpptyTaggingField from "./OpptyTaggingField";
import ResetFilter from "./ResetFilter";
import RoleFamilyField from "./RoleFamilyField";
import StartDateField from "./StartDateField";
import Submit from "./Submit";

function ModalFilter(): ReactElement {
  const dispatch = useDispatch();
  const open = useSelector((state: RootState) => state.modal.showDemandFilters);
  const [hasMounted, setHasMounted] = useState(false);

  const handleClose = () => {
    dispatch(setModalVisibility({ key: "showDemandFilters", value: false }));
    // If you need to reset form fields, call the appropriate reset function here.
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
    setHasMounted(true);
  }, []);

  if (!hasMounted)
    return <></>;

  return (
    <>
      {/* ✅ Manual backdrop */}
      {open && (
        <Box
          onClick={handleClose}
          sx={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: theme => theme.zIndex.drawer,
          }}
        />
      )}

      {/* ✅ Persistent drawer */}
      <Drawer
        anchor="right"
        open={open}
        onClose={handleClose}
        variant="persistent"
        sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}
      >
        <Box
          sx={{
            width: {
              xs: "100vw", // Full width on mobile
              sm: "70vw",
              md: 500, // Fixed width on desktop
            },
            p: {
              xs: 2,
              md: 3,
            },
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6">Filters</Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider />

          <Box
            sx={{
              flexGrow: 1,
              mt: 2,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
              <StartDateField />
              <EndDateField />
            </Box>
            <RoleFamilyField />
            <CareerLevelField />
            {/* commit level */}
            <OpptyTaggingField />
          </Box>

          <Box
            sx={{
              mt: "auto",
              display: "flex",
              justifyContent: "flex-end",
              flexDirection: "column",
              gap: 2,
              py: 2,
            }}
          >
            <Submit />
            <ResetFilter />
          </Box>
        </Box>
      </Drawer>
    </>
  );
}

export default ModalFilter;
