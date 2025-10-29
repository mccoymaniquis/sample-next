import { FormControl } from "@mui/material";
import * as React from "react";
import { Controller, useFormContext } from "react-hook-form";

import DropzoneArea from "@/components/DropzoneArea";

// import { ErrorMessage } from '@hookform/error-message';

type UploadFormValues = {
  file: File | null;
  uploadProgress: number;
};

export default function UploadField() {
  // const { control, formState } = useFormContext();
  const { control, setValue } = useFormContext<UploadFormValues>();

  return (
    <Controller
      name="file"
      control={control}
      rules={{ required: false }}
      render={({ field }) => (
        <FormControl fullWidth>
          <DropzoneArea
            value={field.value}
            onChange={field.onChange}
            onUploadProgress={progress => setValue("uploadProgress", progress)}
            acceptedFiles={{
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
              "text/csv": [".csv"],
            }}
          />
          {/* <ErrorMessage
            errors={formState.errors}
            name="file"
            render={({ message }) => (
              <Typography
                sx={{
                  fontSize: 12,
                  color: '#D32F2F',
                  fontWeight: 400,
                  margin: '2px',
                }}
              >
                {message}
              </Typography>
            )}
          /> */}
        </FormControl>
      )}
    />
  );
}
