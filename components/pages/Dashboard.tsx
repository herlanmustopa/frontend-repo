"use client";

import { Typography, Container } from "@mui/material";
import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import UserTable from "@/components/organism/UserTable";

const  DashboardPage = () => {
  const user = useAppSelector((state: RootState) => state.auth.user);
  return (
      <Container>
        <Typography variant="h4" gutterBottom>
          Welcome, {user?.name || "User"}!
        </Typography>
        <Typography variant="body1">
          This is your dashboard where you can manage your account.
        </Typography>
        <UserTable />
      </Container>
  );
}

export default DashboardPage;