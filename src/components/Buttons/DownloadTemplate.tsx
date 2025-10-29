import { Button } from "@mui/material";
import React from "react";
import { useFormContext } from "react-hook-form";

import { downloadExcelTemplate } from "@/helpers/downloadExcel";

type DownloadTemplate = {
  templateName: string;
  headers: string[];
};

const buttonStyles = {
  "background": "linear-gradient(90deg, #16D1D3 0%, #407CF1 50%, #1C47A5 100%)",
  "color": "#fff",
  "px": 4,
  "borderRadius": "8px",
  "height": "40px",
  "width": "100%",
  "&:hover": {
    background: "linear-gradient(90deg, #16D1D3 0%, #407CF1 50%, #1C47A5 100%)",
    opacity: 0.8,
  },
};

const DownloadTemplate: React.FC<DownloadTemplate> = ({ headers, templateName }) => {
  const { formState } = useFormContext();
  const { isSubmitting } = formState;

  const handleExportTemplate = (e: React.ChangeEvent<EventTarget>) => {
    e.preventDefault();
    downloadExcelTemplate(headers, templateName);
  };

  return (
    <Button
      onClick={e => handleExportTemplate(e)}
      disabled={isSubmitting}
      sx={buttonStyles}
      type="submit"
    >
      Download Template
    </Button>
  );
};

export default DownloadTemplate;
