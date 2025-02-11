'use client';
import DashboardPage from "@/components/pages/Dashboard";
import { Typography } from "@mui/material";

export default function Dashboard() {
  return (
    <div>
        <Typography variant="h4" gutterBottom>
            Dashboard
            </Typography>
            <DashboardPage />
    </div>
  );
}
