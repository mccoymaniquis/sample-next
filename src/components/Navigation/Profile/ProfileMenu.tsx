/* eslint-disable react/no-array-index-key */
"use client";

import { ListItemIcon, MenuItem } from "@mui/material";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import { MENU_ITEMS } from "@/constants/menuItems";
import { setModalVisibility } from "@/reducers/Modal";

type Props = {
  role: string;
};

function ProfileMenu({ role }: Props) {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleOpen = () => {
    dispatch(setModalVisibility({ key: "showAboutModal", value: true }));
  };

  return (
    <>
      {MENU_ITEMS.filter(
        item => !item.roles || item.roles.includes(role),
      ).map((item, index) => {
        const Icon = item.icon;

        return (
          <MenuItem
            key={index}
            onClick={() => {
              if (item.action)
                item.action();
              else if (item.route)
                router.push(item.route);
              else if (item.label === "About")
                handleOpen();
            }}
          >
            <ListItemIcon>
              <Icon fontSize="small" />
            </ListItemIcon>
            {item.label}
          </MenuItem>
        );
      })}
    </>
  );
}

export default ProfileMenu;
