import type { AxiosResponseTransformer } from "axios";

import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useForm } from "react-hook-form";

import type { AlertOption } from "@/components/CustomAlert";
import type { ChangePasswordParams } from "@/services/mutations/changePassword";
import type { Decoded } from "@/types";

import { encryptPassword } from "@/helpers/encrypt";
import { useChangePassword as useChangePasswordService } from "@/services/mutations/changePassword";
import { changePasswordSchema } from "@/validation/changePasswordSchema";

enum Variant {
  Current = "current",
  Default = "default",
}

function useChangePassword(variant: string) {
  const token = Cookies.get("accessToken");
  const email = token ? jwtDecode<Decoded>(token).sub : "";
  const isCurrentChangePass = variant === Variant.Current;

  const [isSuccess, setSuccess] = useState(false);
  const [alertOpt, setAlert] = useState<AlertOption>({
    variant: "info",
    message: "",
    show: false,
  });

  const changePassword = useChangePasswordService();
  const form = useForm({
    resolver: zodResolver(changePasswordSchema),
    mode: "onBlur",
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
      currentPassword: "",
      variant,
    },
  });

  const handleAsyncError = (error: AxiosResponseTransformer) => {
    if (isAxiosError(error)) {
      const message = error.response?.data?.message;

      if (message.includes("Failed to change password:")) {
        setAlert({
          variant: "error",
          message: `New password must be different from the ${variant} password.`,
          show: true,
        });
      }

      if (isCurrentChangePass) {
        if (message.includes("Failed to change password: Old password does not match")) {
          setAlert({
            variant: "error",
            message: "Current password is incorrect.",
            show: true,
          });
        }
      }

      return;
    }

    setAlert({
      variant: "error",
      message: "An unknown error occurred.",
      show: true,
    });
  };

  const handleAsyncSuccess = async<T extends ChangePasswordParams>(data: T) => {
    const currentPassword = isCurrentChangePass && data?.currentPassword ? data?.currentPassword : "";

    await changePassword.mutateAsync({
      oldPassword: encryptPassword(currentPassword),
      newPassword: encryptPassword(data?.newPassword),
      email,
    });

    setSuccess(true);
    setAlert({
      variant: "success",
      message: "Password updated successfully.",
    });
  };

  const handleOnSubmit = async<T extends ChangePasswordParams>(data: T) => {
    setAlert({
      variant: "error",
      message: "",
      show: false,
    });

    try {
      await handleAsyncSuccess(data);
    }
    catch (error: any) {
      handleAsyncError(error);
    }
  };

  const handleCloseMessage = () => {
    setAlert({
      variant: "error",
      message: "",
      show: false,
    });
  };

  return {
    handleCloseMessage,
    handleOnSubmit,
    isSuccess,
    alertOpt,
    form,
  };
}

export default useChangePassword;
