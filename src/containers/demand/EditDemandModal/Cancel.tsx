import { Button } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";

import { setModalVisibility } from "@/reducers/Modal";

type CancelProps = {
  methods: {
    reset: () => void;
  };
};

function Cancel({ methods }: CancelProps) {
  const dispatch = useDispatch();

  const onClose = () => {
    methods.reset(); // ← Reset form values
    dispatch(setModalVisibility({ key: "showDemandUpdateDetails", value: false }));
  };

  return (
    <Button
      onClick={onClose}
      type="button"
      variant="contained"
      sx={{
        "background": "#fff",
        "color": "#333",
        "textTransform": "none",
        "fontWeight": 600,
        "height": "auto",
        "fontSize": 16,
        "paddingX": 4,
        "border": "1px solid #555",
        "&:hover": {
          background: "#f0f0f0",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Optional shadow
        },
      }}
    >
      Cancel
    </Button>
  );
}

export default Cancel;
