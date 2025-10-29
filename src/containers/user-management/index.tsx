/* eslint-disable react-hooks-extra/no-direct-set-state-in-use-effect */
"use client";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import type { RootState } from "@/reducers/Store";

import AddUserModal from "./AddUserModal";
import Table from "./Table";
import TopButton from "./TopButton";
import UpdateUserModal from "./UpdateUserModal";

const EXECOM_ROLE_ACCESS = "EXECOM";
const RMG_ROLE_ACCESS = "RMG";
const REDIRECT_ROUTE = "/charts";
const PAGE_TITLE = "User Management";

export default function UserManagement() {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user.user);
  const { roleName } = user?.permissions || { roleName: EXECOM_ROLE_ACCESS };

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && roleName !== RMG_ROLE_ACCESS) {
      router.push(REDIRECT_ROUTE);
    }
  }, [isClient, roleName, router]);

  if (!isClient || roleName !== RMG_ROLE_ACCESS)
    return null;

  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 2 }}>
        {PAGE_TITLE}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <TopButton />
        <Table />
      </Box>
      <AddUserModal />
      <UpdateUserModal />
    </Box>
  );
}
