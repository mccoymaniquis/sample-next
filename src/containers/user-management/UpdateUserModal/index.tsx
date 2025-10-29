import { zodResolver } from "@hookform/resolvers/zod";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Apartment from "@mui/icons-material/Apartment";
import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import type { RootState } from "@/reducers/Store";
import type { CreateUserForm } from "@/validation/userSchema";

import Modal from "@/components/Modal";
import { setModalVisibility } from "@/reducers/Modal";
import { useUpdateUser } from "@/services/mutations/users";
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

function UpdateUserModal() {
  const dispatch = useDispatch();

  const updateUser = useUpdateUser();

  const methods = useForm<CreateUserForm>({
    resolver: zodResolver(createUserSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onBlur",
  });

  const open = useSelector((state: RootState) => state.modal.showUpdateUserModal);
  const activeUser = useSelector((state: RootState) => state.user.activeUser);
  const id = activeUser?.id;

  useEffect(() => {
    if (activeUser) {
      methods.reset({
        firstName: activeUser?.employeesDTO?.firstName ?? "N/A",
        middleName: activeUser?.employeesDTO?.middleName || "",
        lastName: activeUser?.employeesDTO?.lastName ?? "N/A",
        suffix: activeUser?.employeesDTO?.suffix || "",
        email: activeUser?.userName ?? "N/A",
        role: {
          id: activeUser?.roleDTO?.name,
          label: activeUser?.roleDTO?.name,
        },
      });
    }
  }, [activeUser, methods]);

  const onClose = () => {
    methods.reset();
    dispatch(setModalVisibility({ key: "showUpdateUserModal", value: false }));
  };

  const onSubmit = async (data: CreateUserForm) => {
    try {
      if (typeof id !== "number") {
        throw new TypeError("User ID is missing or invalid.");
      }
      await updateUser.mutateAsync({
        id,
        employeesDTO: {
          firstName: data.firstName,
          middleName: data.middleName || "",
          lastName: data.lastName,
          suffix: data.suffix || "",
          empEmail: data.email,
        },
        role: data.role?.id?.toString() || "",
      });

      toast.success("User details updated successfully.", { position: "top-right" });
      methods.reset();
      dispatch(setModalVisibility({ key: "showUpdateUserModal", value: false }));
    }
    catch (error: any) {
      const message = error?.response?.data?.message || "An unexpected error occurred.";
      console.error("Error creating user:", message);
      toast.error(message, { position: "top-right" });
    }
  };

  return (
    <Modal open={open} width={1000} onClose={onClose} disableAutoFocus={false} title="Edit User">
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

export default UpdateUserModal;
