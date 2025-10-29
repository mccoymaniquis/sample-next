import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";

import { setModalVisibility } from "@/reducers/Modal";

function TopButton() {
  const dispatch = useDispatch();

  const createUserModal = () => {
    dispatch(setModalVisibility({ key: "showAddUserModal", value: true }));
  };
  return (
    <Box sx={{ display: "flex", width: "100%", justifyContent: "flex-end", gap: 1 }}>
      <Button
        onClick={() => createUserModal()}
        sx={{
          "background": "linear-gradient(90deg, #16D1D3 0%, #407CF1 50%, #1C47A5 100%)",
          "color": "#fff",
          "px": 2,
          "borderRadius": "8px",
          "height": "40px",
          "&:hover": {
            background: "linear-gradient(90deg, #16D1D3 0%, #407CF1 50%, #1C47A5 100%)",
            opacity: 0.8,
          },
        }}
      >
        <PersonAddAltIcon style={{ width: 28, height: 28, marginLeft: 1 }} />
        <Typography
          sx={{
            pl: 1,
            fontSize: {
              xs: 14,
              md: 16,
            },
            marginRight: 1,
            textTransform: "none",
          }}
        >
          Create user
        </Typography>
      </Button>
    </Box>
  );
}

export default TopButton;
