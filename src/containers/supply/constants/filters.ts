export const EXCEL_HEADERS = [
  "Name",
  "Role Family",
  "CL",
  "Head Count",
  "Start Date",
  "End Date",
];

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

export const BTN_FILTER_STYLE = {
  background: "#fff",
  borderRadius: "8px",
  padding: "3px",
  backgroundImage: "linear-gradient(white, white), linear-gradient(90deg, #16D1D3, #1C47A5)",
  backgroundClip: "content-box, border-box",
  height: "40px",
  width: "40px",
  minWidth: "40px",
};

export const FILTER_CONTAINER_STYLE = {
  display: "flex",
  flexDirection: {
    xs: "column", // mobile
    sm: "row", // tablet and up
  },
  gap: {
    xs: 2,
    sm: 2,
  },
  py: {
    xs: 2,
    sm: 2,
    md: 3,
  },
  alignItems: {
    xs: "stretch",
    sm: "center",
  },
};
