/* eslint-disable react/no-array-index-key */
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box, Button, Menu, MenuItem } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

import { NAVIGATION_ROUTES } from "@/constants/routes";

export type NavigationRoute = {
  path: string;
  name: string;
  description: string;
  childPaths?: NavigationRoute[];
};

function NavigationTab() {
  const pathName = usePathname();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleHoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleHoverClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{ display: { xs: "none", md: "flex" }, gap: 2, flexGrow: 1 }}
      onMouseLeave={handleHoverClose}
    >
      {NAVIGATION_ROUTES.map((route: NavigationRoute, index) => {
        const isActive = pathName === route.path
          || pathName.startsWith(`${route.path}/`);

        if (route.childPaths) {
          return (
            <React.Fragment key={index}>
              <Button
                color="inherit"
                onMouseEnter={handleHoverOpen}
                sx={{
                  "display": "flex",
                  "alignItems": "center", // ✅ vertical centering
                  "gap": 1,
                  "fontWeight": isActive ? "bold" : "normal",
                  "color": isActive ? "#4BEFF1" : "#fff",
                  "borderBottom": isActive ? "2px solid #4BEFF1" : "none",
                  "borderRadius": 0,
                  "&:hover": {
                    color: "#4BEFF1",
                    borderBottom: "2px solid #4BEFF1",
                    fontWeight: "bold",
                  },
                }}
              >
                {route.name}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <ChevronRightIcon
                    sx={{
                      transform: anchorEl ? "rotate(90deg)" : "rotate(0deg)",
                      transition: "transform 0.2s ease-in-out",
                      fontSize: 18,
                    }}
                  />
                </Box>
              </Button>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleHoverClose}
                MenuListProps={{
                  onMouseLeave: handleHoverClose,
                }}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
              >
                {route.childPaths.map((child, childIndex) => {
                  const isChildActive = pathName === child.path;
                  return (
                    <MenuItem key={childIndex} onClick={handleHoverClose}>
                      <Link href={child.path} passHref>
                        <Button
                          color="inherit"
                          sx={{
                            fontWeight: isChildActive ? "bold" : "normal",
                            textTransform: "none",
                          }}
                        >
                          {child.name}
                        </Button>
                      </Link>
                    </MenuItem>
                  );
                })}
              </Menu>
            </React.Fragment>

          );
        }

        return (
          <Link key={index} href={route.path} passHref>
            <Button
              color="inherit"
              sx={{
                "fontWeight": isActive ? "bold" : "normal",
                "color": isActive ? "#4BEFF1" : "#fff",
                "borderBottom": isActive ? "2px solid #4BEFF1" : "none",
                "borderRadius": 0,
                "&:hover": {
                  color: "#4BEFF1",
                  borderBottom: "2px solid #4BEFF1",
                  fontWeight: "bold",
                },
              }}
            >
              {route.name}
            </Button>
          </Link>
        );
      })}
    </Box>
  );
}

export default NavigationTab;
