"use client";

import { Box, Button, CircularProgress } from "@mui/material";
import _ from "lodash";
import React from "react";
import { useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";

import { getHighestBenchFilters } from "@/reducers/Charts";

type SubmitButtonProps = {
  fullWidth?: boolean;
};

const SubmitButton: React.FC<SubmitButtonProps> = ({ fullWidth = true }) => {
  const {
    formState: { isSubmitting },
    watch,
  } = useFormContext();
  const filters = useSelector(getHighestBenchFilters);

  const currentValues = watch(); // Current form state
  const isChangedFromLastSubmit = !_.isEqual(currentValues, filters);

  return (
    <Box sx={{ width: 250 }}>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth={fullWidth}
        disabled={isSubmitting || !isChangedFromLastSubmit}
      >
        {isSubmitting
          ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            )
          : (
              "Apply Filter"
            )}
      </Button>
    </Box>
  );
};

export default SubmitButton;
