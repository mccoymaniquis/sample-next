import EditIcon from "@mui/icons-material/Edit";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import VisibilityIcon from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import type { DemandPaginationProps } from "@/types/demand";

import { toISOorNull } from "@/helpers/date";
import { setActiveDemand } from "@/reducers/Demand"; // make sure this exists/exported
import { setModalVisibility } from "@/reducers/Modal";

type Props = { row: DemandPaginationProps; isEditable?: boolean };

const ActionButton: React.FC<Props> = ({ row, isEditable = true }) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpen = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleView = () => {
    const updatedMapped = {
      ...row,
      startDate: toISOorNull(row.startDate) ?? undefined,
      endDate: toISOorNull(row.endDate) ?? undefined,
      projectStartDate: toISOorNull(row.projectStartDate) ?? undefined,
      projectEndDate: toISOorNull(row.projectEndDate) ?? undefined,
    };
    dispatch(setActiveDemand(updatedMapped)); // adjust if your action name differs
    dispatch(setModalVisibility({ key: "showDemandDetails", value: true })); // adjust key if needed
    handleClose();
  };

  const handleEdit = () => {
    const updatedMapped = {
      ...row,
      startDate: toISOorNull(row.startDate) ?? undefined,
      endDate: toISOorNull(row.endDate) ?? undefined,
      projectStartDate: toISOorNull(row.projectStartDate) ?? undefined,
      projectEndDate: toISOorNull(row.projectEndDate) ?? undefined,
    };
    dispatch(setActiveDemand(updatedMapped));
    dispatch(setModalVisibility({ key: "showDemandUpdateDetails", value: true })); // adjust key if needed
    handleClose();
  };

  return (
    <>
      <IconButton onClick={handleOpen} aria-label="open actions">
        <MoreHorizIcon />
      </IconButton>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleView} sx={{ fontWeight: 500, color: "#333" }}>
          <ListItemIcon>
            <VisibilityIcon style={{ width: 22, height: 22 }} />
          </ListItemIcon>
          View
        </MenuItem>
        {isEditable && (
          <MenuItem onClick={handleEdit} sx={{ fontWeight: 500, color: "#333" }}>
            <ListItemIcon>
              <EditIcon style={{ width: 22, height: 22 }} />
            </ListItemIcon>
            Edit
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default ActionButton;
