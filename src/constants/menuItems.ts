import GroupIcon from "@mui/icons-material/Group";
import InfoIcon from "@mui/icons-material/Info";
import KeyIcon from "@mui/icons-material/Key";
import LogoutIcon from "@mui/icons-material/Logout";
import Cookies from "js-cookie";

export type MenuItemType = {
  label: string;
  route?: string;
  icon: React.ElementType; // This is the actual component (e.g. LogoutIcon)
  action?: () => void;
  roles?: string[];
};

export const MENU_ITEMS: MenuItemType[] = [
  {
    label: "User Management",
    route: "/user-management",
    icon: GroupIcon,
    roles: ["RMG"],
  },
  {
    label: "About",
    icon: InfoIcon,
  },
  {
    label: "Change Password",
    route: "/change-current-password",
    icon: KeyIcon,
  },
  {
    label: "Logout",
    icon: LogoutIcon,
    action: () => {
      Cookies.remove("accessToken", { path: "/" });
      localStorage.clear();
      window.location.href = "/login";
    },
  },
];
