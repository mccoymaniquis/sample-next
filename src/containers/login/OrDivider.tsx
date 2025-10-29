import { Box, Typography } from "@mui/material";

function OrDivider() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        gap: {
          xs: 1, // gap between items on small screens
          sm: 2, // gap between items on larger screens
        },
        my: {
          xs: 0,
          sx: 3,
        },
      }}
    >
      <Box sx={{ flex: 1, height: {
        xs: 2,
        sm: 0.1,
      }, backgroundColor: "#BDBDBD" }}
      />
      <Typography variant="body2" sx={{ color: "#5F5F5F", fontSize: "16px", fontWeight: 400 }}>
        OR
      </Typography>
      <Box sx={{ flex: 1, height: {
        xs: 2,
        sm: 0.1,
      }, backgroundColor: "#BDBDBD" }}
      />
    </Box>
  );
}

export default OrDivider;
