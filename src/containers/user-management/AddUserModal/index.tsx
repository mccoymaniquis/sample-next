import { zodResolver } from "@hookform/resolvers/zod";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Apartment from "@mui/icons-material/Apartment";
import { Box, Typography } from "@mui/material";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import type { RootState } from "@/reducers/Store";
import type { CreateUserForm } from "@/validation/userSchema";

import Modal from "@/components/Modal";
import { setModalVisibility } from "@/reducers/Modal";
import { useCreateUser } from "@/services/mutations/users";
import { createUserSchema } from "@/validation/userSchema";

import Cancel from "./Cancel";
import EmailField from "./EmailField";
import FirstNameField from "./FirstNameField";
import LastNameField from "./LastNameField";
import MiddleNameField from "./MiddleNameField";
import RoleField from "./RoleField";
import Submit from "./Submit";
import SuffixField from "./SuffixField";

const DEFAULT_VALUES = {
  firstName: "",
  middleName: "",
  lastName: "",
  suffix: "",
  email: "",
  role: null,
};

function AddUserModal() {
  const dispatch = useDispatch();

  const createUser = useCreateUser();

  const methods = useForm<CreateUserForm>({
    resolver: zodResolver(createUserSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onBlur",
  });

  const open = useSelector((state: RootState) => state.modal.showAddUserModal);

  const onClose = () => {
    methods.reset();
    dispatch(setModalVisibility({ key: "showAddUserModal", value: false }));
  };

  const onSubmit = async (data: CreateUserForm) => {
    try {
      await createUser.mutateAsync({
        employeesDTO: {
          firstName: data.firstName,
          middleName: data.middleName || "",
          lastName: data.lastName,
          suffix: data.suffix || "",
          empEmail: data.email,
        },
        role: data.role?.id?.toString() || "",
      });

      toast.success("User created successfully.", { position: "top-right" });
      methods.reset();
      dispatch(setModalVisibility({ key: "showAddUserModal", value: false }));
    }
    catch (error: any) {
      const message = error?.response?.data?.message || "An unexpected error occurred.";
      console.error("Error creating user:", message);
      toast.error(message, { position: "top-right" });
    }
  };

  return (
    <Modal open={open} width={1000} onClose={onClose} disableAutoFocus={false} title="Create User">
      <FormProvider {...methods}>
        <Box
          component="form"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <AccountCircleIcon sx={{ fontSize: 28, color: "primary.main" }} />
            <Typography sx={{ ml: 1, fontSize: 16, fontWeight: 600, color: "primary.main" }}>
              Name
            </Typography>
          </Box>
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mb: 3,
          }}
          >
            <Box sx={{ display: "flex", gap: 2 }}>
              <FirstNameField />
              <MiddleNameField />
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <LastNameField />
              <SuffixField />
            </Box>
          </Box>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <Apartment sx={{ fontSize: 28, color: "primary.main" }} />
            <Typography sx={{ ml: 1, fontSize: 16, fontWeight: 600, color: "primary.main" }}>
              Company Information
            </Typography>
          </Box>
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mb: 3,
          }}
          >
            <Box sx={{ display: "flex", gap: 2 }}>
              <EmailField />
              <RoleField />
            </Box>
          </Box>
          <Box sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
            mt: 3,
          }}
          >
            <Cancel methods={methods} />
            <Submit />
          </Box>
        </Box>
      </FormProvider>
    </Modal>
  );
}

export default AddUserModal;
