"use client";

import { Typography, Container } from "@mui/material";
import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import Table from "@/components/organism/Table";

const  DashboardPage = () => {
  const user = useAppSelector((state: RootState) => state.auth.user);
  return (
      <Container>
        <Typography variant="h4" gutterBottom>
          Welcome, {user?.name || "User"}!
        </Typography>
        <Table />
      </Container>
  );
}

export default DashboardPage;
