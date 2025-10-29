import { Box, Button, Divider, Menu, MenuItem, Typography } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { useSelector } from "react-redux";

import type { RootState } from "@/reducers/Store";

import DownArrow from "@/assets/navigation/down_arrow.svg";
import FaceIcon from "@/assets/navigation/face.svg";
import { NAVIGATION_ROUTES } from "@/constants/routes";
import { useHasMounted } from "@/hooks/useHasMounted";

import ProfileMenu from "./ProfileMenu";

function Profile() {
  const pathName = usePathname();
  const mounted = useHasMounted();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const user = useSelector((state: RootState) => state.user.user);
  const { firstName, lastName } = user || { firstName: "", lastName: "" };
  const { roleName } = user?.permissions || { roleName: "EXECOM" };
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box
        onClick={handleClick}
        sx={{
          backgroundColor: "#E3EDFF",
          display: "flex",
          alignItems: "center",
          padding: "8px",
          borderRadius: "50px",
          cursor: "pointer",
          gap: 2,
          px: {
            xs: 1,
            md: 2,
          },
          py: {
            xs: 2,
            md: 1,
          },
          justifyContent: "flex-end",
        }}
      >
        <FaceIcon style={{
          width: 20,
          height: 20,
        }}
        />
        <Typography
          variant="body1"
          sx={{
            color: "#192A48",
            display: { xs: "none", md: "flex" },
          }}
        >
          {mounted ? `${firstName} ${lastName}` : " "}
        </Typography>
        <DownArrow style={{ width: "8.5px", height: "4.5px" }} />
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Box
          sx={{
            display: {
              xs: "flex",
              md: "none",
            },
            flexDirection: "column",
          }}
        >
          {
            NAVIGATION_ROUTES.map((route: { path: string; name: string; description: string }, index) => {
              const isActive = pathName === route.path;
              return (
                // eslint-disable-next-line react/no-array-index-key
                <MenuItem key={index}>
                  <Link href={route.path} passHref>
                    <Button
                      color="inherit"
                      sx={{
                        fontWeight: isActive ? "bold" : "normal",
                      }}
                    >
                      {route.name}
                    </Button>
                  </Link>
                </MenuItem>
              );
            })
          }
          <Divider />
        </Box>
        <Box>
          <ProfileMenu role={roleName} />
        </Box>
      </Menu>
    </>
  );
}

export default Profile;
