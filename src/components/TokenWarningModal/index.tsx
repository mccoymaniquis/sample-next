"use client";

import WarningIcon from "@mui/icons-material/Warning";
import { Box, Button, Typography } from "@mui/material";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "@/reducers/Store";

import Modal from "@/components/Modal";
import { setModalVisibility } from "@/reducers/Modal";

type JwtPayload = {
  exp: number;
};

function TokenWarningModal() {
  const dispatch = useDispatch();
  const open = useSelector((state: RootState) => state.modal.showTokenWarningModal);
  const intervalRef = useRef<boolean>(false);

  const onClose = () => {
    dispatch(setModalVisibility({ key: "showTokenWarningModal", value: false }));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const token = Cookies.get("accessToken") || "";
      if (!token)
        return;

      try {
        const decoded = jwtDecode<JwtPayload>(token);
        const currentTime = Math.floor(Date.now() / 1000);
        const remainingTime = decoded.exp - currentTime;

        if (remainingTime <= 300 && remainingTime > 0 && !intervalRef.current) {
          intervalRef.current = true;
          dispatch(setModalVisibility({ key: "showTokenWarningModal", value: true }));
        }
      }
      catch (err) {
        console.error("Invalid token:", err);
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <Modal open={open} width={600} onClose={onClose} disableAutoFocus>
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <WarningIcon sx={{ fontSize: 60, color: "#FFA726" }} />
        </Box>
        <Typography sx={{ fontSize: "24px", fontWeight: "bold", mb: 1 }}>
          <span className="font-montserrat">Session Expiring Soon</span>
        </Typography>
        <Typography sx={{ fontSize: "18px", mx: 4 }}>
          <span className="font-montserrat">
            For your security, please save your work and log in again to continue.
          </span>
        </Typography>
        <Button
          variant="contained"
          className="gradient normal-case"
          sx={{
            width: "65%",
            mt: 4,
            height: "5vh",
          }}
          onClick={onClose}
        >
          <Typography sx={{ textTransform: "none" }}>
            <span className="font-montserrat text-base font-semibold">
              Dismiss
            </span>
          </Typography>
        </Button>
      </Box>
    </Modal>
  );
}

export default TokenWarningModal;
