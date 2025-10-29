import type { Accept } from "react-dropzone";

import {
  Box,
  IconButton,
  LinearProgress,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

import CloseIcon from "@/assets/icons/close_icon.svg";
import DeleteIcon from "@/assets/icons/delete_icon.svg";
import DeveloperGuideIcon from "@/assets/icons/developer_guide.svg";
import UploadIcon from "@/assets/icons/upload_icon.svg";

type DropzoneAreaProps = {
  value: File | null;
  onChange: (file: File | null) => void;
  acceptedFiles: Accept;
  onUploadProgress?: (progress: number) => void;
};

function DropzoneArea({ value: file, onChange, acceptedFiles, onUploadProgress }: DropzoneAreaProps) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (file) {
    // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
      setUploadProgress(100);
    }
    else {
    // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
      setUploadProgress(0);

      onUploadProgress?.(0); //
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  const simulateUpload = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 25;
      setUploadProgress(progress);
      onUploadProgress?.(progress); // 👈 notify parent
      if (progress >= 100)
        clearInterval(interval);
    }, 500);
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onChange(acceptedFiles[0]);
        setError(null);

        simulateUpload();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onChange],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    maxSize: 10 * 1024 * 1024,
    accept: acceptedFiles,
    onDropRejected: (rejections) => {
      rejections.forEach(({ errors }) => {
        errors.forEach(({ code }) => {
          if (code === "too-many-files")
            setError("Multiple file upload is not allowed. Please try again.");
          if (code === "file-too-large")
            setError("File size exceeds the 10mb limit.");
          if (code === "file-invalid-type")
            setError("Invalid file type. Please upload another one.");
        });
      });
    },
  });

  const handleRemove = () => {
    onChange(null);
    setUploadProgress(0);
    setError(null);
  };

  return (
    <>
      <Box
        {...getRootProps()}
        sx={{
          border: `2px dashed ${error ? "#DD2629" : "#ccc"}`,
          borderRadius: "4px",
          padding: "20px",
          textAlign: "center",
          cursor: "pointer",
          backgroundColor: error ? "#FFF3F3" : "transparent",
        }}
      >
        <input {...getInputProps()} />
        {file
          ? (
              <>
                <Box sx={{ display: "flex", width: "100%", gap: 1 }}>
                  <DeveloperGuideIcon style={{
                    height: 28,
                    width: 28,
                  }}
                  />
                  <Box
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "16px",
                    }}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                      <Typography variant="body2" sx={{ fontSize: "14px", fontWeight: 600 }}>
                        {file.name}
                      </Typography>
                      <Typography variant="body2" sx={{ fontSize: "12px", fontWeight: 400 }}>
                        {(file.size / 1024).toFixed()}
                        {" "}
                        KB
                      </Typography>
                    </Box>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove();
                      }}
                      size="small"
                    >
                      {
                        uploadProgress >= 100 ? <DeleteIcon style={{ height: 32, width: 32 }} /> : <CloseIcon style={{ height: 32, width: 32 }}></CloseIcon>
                      }
                    </IconButton>
                  </Box>
                </Box>
                <Typography fontSize={12} color={uploadProgress >= 100 ? "#37913B" : "#1C47A5"} sx={{ display: "flex" }}>
                  {uploadProgress >= 100 ? "Upload Complete!" : "Uploading File..."}
                </Typography>
                <Box display="flex" alignItems="center" mt={1}>
                  <LinearProgress
                    variant="determinate"
                    value={uploadProgress}
                    sx={{
                      "flexGrow": 1,
                      "height": 10,
                      "borderRadius": 20,
                      "& .MuiLinearProgress-bar": {
                        background: uploadProgress >= 100
                          ? "#5EC263"
                          : "linear-gradient(90deg, #16D1D3, #407CF1)",
                      },
                    }}
                  />
                  <Typography fontSize={12} ml={1}>
                    {uploadProgress}
                    %
                  </Typography>
                </Box>
              </>
            )
          : (
              <>
                <Box sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: 2,
                  alignItems: "center",
                }}
                >
                  <UploadIcon style={{
                    height: 50,
                    width: 50,
                  }}
                  />
                  <Typography fontSize={14} fontWeight={600}>
                    <Box component="span" sx={{ color: "#407CF1", textDecoration: "underline" }}>
                      Browse
                    </Box>
                    {" "}
                    <Box component="span" sx={{ color: "#262626" }}>
                      or drag & drop your certificate
                    </Box>
                  </Typography>
                  <Typography fontSize={12}>Supported formats: XLSX, CSV</Typography>
                  <Typography fontSize={12}>Maximum file size: 10MB</Typography>
                </Box>
              </>
            )}

      </Box>
      {error && (
        <Typography fontSize={12} color="error" mt={1}>
          {error}
        </Typography>
      )}
    </>
  );
}

export default DropzoneArea;
