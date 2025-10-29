"use client";
import type { TextFieldProps } from "@mui/material";

import { ErrorMessage } from "@hookform/error-message";
import {
  Autocomplete,
  Chip,
  FormControl,
  TextField,
} from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

type OptionType = {
  id: number | string;
  label: string;
};

type MultipleSelectProps = {
  name: string;
  label: string;
  options: OptionType[];
  sx?: TextFieldProps["sx"];
  defaultValue?: OptionType[];
};

const MultipleSelect: React.FC<MultipleSelectProps> = ({
  name,
  label,
  options,
  sx,
  // eslint-disable-next-line react/no-unstable-default-props
  defaultValue = [],
}) => {
  const { control, formState } = useFormContext();
  const { errors } = formState;

  return (
    <FormControl fullWidth>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <Autocomplete
            multiple
            options={options}
            getOptionLabel={option => option.label}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            value={field.value || []}
            onChange={(_, data) => field.onChange(data)}
            renderTags={(value: OptionType[], getTagProps) => {
              const maxVisible = 1;
              const visible = value.slice(0, maxVisible);
              const hiddenCount = value.length - visible.length;

              return [
                ...visible.map((option, index) => (
                  <Chip
                    variant="outlined"
                    label={option.label}
                    {...getTagProps({ index })}
                    key={option.id}
                    size="small"
                    sx={{
                      "height": 24,
                      "backgroundColor": "#1976d2",
                      "color": "#fff",
                      "fontWeight": 500,
                      "& .MuiChip-deleteIcon": {
                        "color": "#fff",
                        "&:hover": {
                          color: "#DD2629",
                          backgroundColor: "#fff",
                          borderRadius: "50%",
                        },
                      },
                    }}
                  />
                )),
                hiddenCount > 0 && (
                  <Chip
                    key="more"
                    label={`+${hiddenCount}`}
                    disabled
                    size="small"
                    sx={{
                      height: 24,
                      backgroundColor: "#e0e0e0",
                      color: "#333",
                      fontWeight: 500,
                    }}
                  />
                ),
              ];
            }}
            renderInput={params => (
              <TextField
                {...params}
                label={label}
                variant="outlined"
                error={!!errors[name]}
                helperText={(
                  <ErrorMessage
                    errors={errors}
                    name={name}
                    render={({ message }) => message}
                  />
                )}
                size="small"
                sx={{ ...sx, mt: 1 }}
              />
            )}
            sx={{
              minWidth: 200,
              maxWidth: "100%",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              ...sx,
            }}
          />
        )}
      />
    </FormControl>
  );
};

export default MultipleSelect;
