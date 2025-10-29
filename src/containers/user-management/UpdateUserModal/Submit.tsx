import { Button, CircularProgress } from "@mui/material";
import React from "react";
import { useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";

import type { RootState } from "@/reducers/Store";
import type { CreateUserForm } from "@/validation/userSchema";

function Submit() {
  const { watch, formState } = useFormContext<CreateUserForm>();
  const { errors, isSubmitting } = formState;

  const {
    firstName,
    middleName,
    lastName,
    suffix,
    email,
    role,
  } = watch();

  const activeUser = useSelector((state: RootState) => state.user.activeUser);

  const isUnchanged
    = !!activeUser
      && firstName === (activeUser?.employeesDTO?.firstName || "N/A")
      && (middleName || "") === (activeUser?.employeesDTO?.middleName || "")
      && lastName === (activeUser?.employeesDTO?.lastName || "N/A")
      && (suffix || "") === (activeUser?.employeesDTO?.suffix || "")
      && email === (activeUser?.employeesDTO?.empEmail || "N/A")
      && String(role?.label) === String(activeUser?.roleDTO?.name);

  const hasErrors = !!Object.keys(errors).length;

  const isDisabled
    = !firstName || !lastName || !email || !role || hasErrors || isSubmitting || isUnchanged;

  return (
    <Button
      disabled={isDisabled}
      type="submit"
      variant="contained"
      sx={{
        "background": "linear-gradient(90deg, #16D1D3 0%, #407CF1 54%, #1C47A5 95%)",
        "color": "#fff",
        "textTransform": "none",
        "fontWeight": 600,
        "height": "auto",
        "fontSize": 16,
        "paddingX": 4,
        "&:hover": {
          background: "linear-gradient(90deg, #13c6c8 0%, #3b72e8 54%, #173c91 95%)",
        },
      }}
    >
      {isSubmitting
        ? (
            <>
              Updating..
              <CircularProgress size={20} sx={{ color: "white", ml: 1 }} />
            </>
          )
        : (
            "Update"
          )}
    </Button>
  );
}

export default Submit;
