import type React from "react";

export const backgroundStyles = {
  backgroundImage: "url(\"/containers/login/login-background-image.svg\")",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  color: "#185FDF",
  maxWidth: "100%",
  minHeight: "100vh",
  height: {
    sm: "auto",
  },
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: {
    xs: 2,
    sm: 0,
  },
};

export const containerStyles = {
  flexDirection: "column",
  alignItems: "center",
  display: "flex",
  py: "30px",
  px: "30px",
  flex: 1,
  gap: 4,
};

export const formStyles: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  width: "400px",
};

export const submitButtonStyles = {
  background: "linear-gradient(90deg, #16D1D3 0%, #407CF1 54%, #1C47A5 95%)",
  textTransform: "none",
  fontWeight: 600,
  width: "100%",
  color: "#fff",
  paddingX: 4,
  height: {
    xs: "auto",
    sm: 56,
  },
  fontSize: {
    xs: 16,
    sm: 18,
  },
};
