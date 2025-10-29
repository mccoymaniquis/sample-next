import DownloadIcon from "@/assets/icons/download.svg";
import UploadIcon from "@/assets/icons/upload.svg";

export const BTN_STYLE = {
  "background": "linear-gradient(90deg, #16D1D3 0%, #407CF1 50%, #1C47A5 100%)",
  "color": "#fff",
  "px": 2,
  "borderRadius": "8px",
  "height": "40px",
  "&:hover": {
    background: "linear-gradient(90deg, #16D1D3 0%, #407CF1 50%, #1C47A5 100%)",
    opacity: 0.8,
  },
};

export const BTN_ICON_SIZES = {
  download: { width: 28, height: 28, marginLeft: 1 },
  upload: { width: 20, height: 20, marginLeft: 1 },
};

export const ICONS = {
  download: DownloadIcon,
  upload: UploadIcon,
  none: null,
};

export const typographyStyle = {
  pl: 1,
  fontSize: {
    xs: 14,
    md: 16,
  },
  marginRight: 1,
};
