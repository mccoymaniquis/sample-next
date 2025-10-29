/* eslint-disable no-console */
/* eslint-disable react-refresh/only-export-components */
import EditIcon from "@mui/icons-material/Edit";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { IconButton, ListItemIcon, Menu, MenuItem, Typography } from "@mui/material";
import moment from "moment";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import type { UsersPaginationProps } from "@/types/users";

import UserConfirmationModal from "@/components/UserConfirmationModal";
import { setModalVisibility } from "@/reducers/Modal";
import { setActiveUser } from "@/reducers/User";
import { useUpdateUserStatus } from "@/services/mutations/users";

// Column type
export type Column<T> = {
  key: keyof T | "action" | "name" | "role" | "updatedAt";
  label: string;
  render?: (row: T) => React.ReactNode;
};

const ACTIVATE_STATUS = "activate";
const DEACTIVATE_STATUS = "deactivate";
const ACTIVE_STATUS = "Active";
const INACTIVE_STATUS = "Inactive";
const ACTIVATED_STATUS = "activated";
const DEACTIVATED_STATUS = "deactivated";

// Helper component for status menu
const StatusMenu: React.FC<{ row: UsersPaginationProps }> = ({ row }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);

  const updateUserStatus = useUpdateUserStatus();

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
  // Blur the currently focused element (likely the <MenuItem>)
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    // Delay unmounting the Menu
    requestAnimationFrame(() => {
      setAnchorEl(null);
    });
  };

  const handleUpdateStatus = () => {
    handleClose(); // no change needed here
    setOpenConfirmationModal(true);
  };

  const submitStatus = async () => {
    const newStatus = !row.active;
    console.log("Deactivating user:", row.id, newStatus);

    try {
      await updateUserStatus.mutateAsync({
        userId: row.id,
        status: newStatus,
      });

      toast.success(`User has been ${newStatus ? ACTIVATED_STATUS : DEACTIVATED_STATUS}`, { position: "top-right" });
      setOpenConfirmationModal(false);
    }
    catch (error: any) {
      const message = error?.response?.data?.message || "An unexpected error occurred.";
      console.error("Error creating user:", message);
      toast.error(message, { position: "top-right" });
    }
  };

  return (
    <>
      <Typography
        variant="body2"
        onClick={handleOpen}
        style={{
          color: row.active ? "#fff" : "#263238",
          backgroundColor: row.active ? "#4CAF50" : "#E0E0E0",
          width: "fit-content",
          padding: "4px 8px",
          borderRadius: "25px",
          cursor: "pointer",
        }}
      >
        {row.active ? ACTIVE_STATUS : INACTIVE_STATUS}
      </Typography>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleUpdateStatus} sx={{ fontWeight: 500, color: "#333", textTransform: "capitalize" }}>
          {row.active ? DEACTIVATE_STATUS : ACTIVATE_STATUS}
        </MenuItem>
      </Menu>
      <UserConfirmationModal
        open={openConfirmationModal}
        onClose={() => setOpenConfirmationModal(false)}
        onSubmit={submitStatus}
        status={row.active ? DEACTIVATE_STATUS : ACTIVATE_STATUS}
      />
    </>
  );
};

// Helper component for action menu
const ActionMenu: React.FC<{ row: UsersPaginationProps }> = ({ row }) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    dispatch(setModalVisibility({ key: "showUpdateUserModal", value: true }));
    dispatch(setActiveUser(row));
    handleClose();
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <MoreHorizIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleEdit} sx={{ fontWeight: 500, color: "#333" }}>
          <ListItemIcon>
            <EditIcon style={{ height: 22, width: 22 }} />
          </ListItemIcon>
          Edit User
        </MenuItem>
      </Menu>
    </>
  );
};

// Final columns
export const columns: Column<UsersPaginationProps>[] = [
  {
    key: "name",
    label: "Name",
    render: (row) => {
      const { firstName = "N/A", lastName = "N/A" } = row.employeesDTO ?? {};
      return `${firstName} ${lastName}`.trim();
    },
  },
  {
    key: "userName",
    label: "Email",
    render: row => row.userName,
  },
  {
    key: "role",
    label: "Role",
    render: row => row.roleDTO?.name ?? "N/A",
  },
  {
    key: "dateCreated",
    label: "Date Created",
    render: row => row?.dateCreated
      ? moment(row.dateCreated).format("MMMM D, YYYY") // ✅ July 16, 2025
      : "N/A",
  },
  {
    key: "active",
    label: "Status",
    render: row => <StatusMenu row={row} />,
  },
  {
    key: "action",
    label: "Actions",
    render: row => <ActionMenu row={row} />,
  },
];
