"use client";

import { Box } from "@mui/material";
import Navbar from "../organism/Navbar";
import Sidebar from "../organism/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Navbar />
        {children}
      </Box>
    </Box>
  );
}
