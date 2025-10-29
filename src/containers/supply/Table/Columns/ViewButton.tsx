"use client";
import type { ReactElement } from "react";

import { Button } from "@mui/material";
import { useDispatch } from "react-redux";

import type { SupplyPaginationProps } from "@/types/supply";

import IconImage from "@/assets/icons/eye_icon.svg";
import { setModalVisibility } from "@/reducers/Modal";
import { setActiveSupply } from "@/reducers/Supply";

function ViewButton(row: SupplyPaginationProps): ReactElement {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setModalVisibility({ key: "showSupplyDetails", value: true }));
    dispatch(setActiveSupply(row));
  };

  return (
    <Button
      variant="contained"
      size="small"
      onClick={handleClick}
      endIcon={<IconImage style={{ height: 18, width: 18, color: "#fff" }} />}
      sx={{
        "backgroundColor": "transparent",
        "border": "1px solid #0551A4",
        "borderColor": "#0551A4",
        "color": "#1C47A5",
        "&:hover": {
          backgroundColor: "rgba(28, 71, 165, 0.04)",
          borderColor: "#0551A4",
        },
      }}
    >
      View
    </Button>
  );
}

export default ViewButton;
