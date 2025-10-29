/* eslint-disable node/no-process-env */
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

function GoogleButton() {
  const handleGoogleLogin = () => {
    const googleUri = process.env.NEXT_PUBLIC_GOOGLE_URI;
    if (googleUri) {
      window.location.href = googleUri;
    }
    else {
      console.error("Google login URI is not defined.");
    }
  };
  return (
    <Button
      type="button"
      variant="outlined"
      fullWidth
      onClick={handleGoogleLogin}
      sx={{
        "backgroundColor": "#fff",
        "borderColor": "#ccc",
        "textTransform": "none",
        "fontWeight": 500,
        "paddingY": 1.5,
        "paddingX": 2,
        "display": "flex",
        "alignItems": "center",
        "justifyContent": "center",
        "gap": 1.5,
        "&:hover": {
          backgroundColor: "#f5f5f5",
        },
      }}
    >
      <Typography
        variant="body2"
        sx={{ fontWeight: 500, color: "#262626", opacity: 0.8, fontSize: {
          xs: 12,
          sm: 16,
        } }}
      >
        Sign in with Google
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Image
          src="/containers/login/google-logo.svg"
          alt="Google logo"
          width={20}
          height={20}
        />
      </Box>
    </Button>
  );
}

export default GoogleButton;
