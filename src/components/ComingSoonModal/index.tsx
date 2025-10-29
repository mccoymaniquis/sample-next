import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "@/reducers/Store";

import CommingSoonImage from "@/assets/modals/comingsoon.svg";
import Modal from "@/components/Modal";
import { setModalVisibility } from "@/reducers/Modal";

function ComingSoonModal() {
  const dispatch = useDispatch();
  const open = useSelector((state: RootState) => state.modal.showComingSoon);

  const onClose = () => {
    dispatch(setModalVisibility({ key: "showComingSoon", value: false }));
  };
  return (
    <Modal open={open} width={600} onClose={onClose} disableAutoFocus={true}>
      <Box sx={{ textAlign: "center" }}>
        <Button
          variant="text"
          sx={{ marginLeft: "auto", display: "block", padding: 0, minWidth: 0 }}
          onClick={onClose}
        >
        </Button>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%", // or use a fixed height like '400px'
            width: "100%",
          }}
        >
          <CommingSoonImage style={{ height: 150, width: 200 }} />
        </Box>
        <Typography
          sx={{
            fontSize: "24px",
            fontWeight: "bold",
            margin: "10px",
          }}
        >
          <span className="font-montserrat">Coming Soon!</span>
        </Typography>
        <Typography
          sx={{
            fontSize: "20px",
          }}
        >
          <span className="font-montserrat">
            This feature is still in the works.
          </span>
        </Typography>
        <Button
          variant="contained"
          className="gradient normal-case"
          sx={{
            width: "65%",
            margin: "30px auto 20px",
            height: "5vh",
          }}
          onClick={onClose}
        >
          <Typography sx={{ textTransform: "none" }}>
            <span className="font-montserrat text-base font-semibold">
              Got It!
            </span>
          </Typography>
        </Button>
      </Box>
    </Modal>
  );
}

export default ComingSoonModal;
