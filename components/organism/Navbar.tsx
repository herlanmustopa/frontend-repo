"use client";

import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import AvatarComponent from "../atoms/Avatar";
import LogoutButton from "../atoms/LogoutButton";


export default function Navbar() {
  return (
    <AppBar position="sticky" sx={{ background: "#2E3B55" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">Dashboard</Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <AvatarComponent />
          <LogoutButton />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
