"use client";

import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import AvatarComponent from "../atoms/Avatar";
import LogoutButton from "../atoms/LogoutButton";
import { RootState } from "@/store/store";
import { useAppSelector } from "@/store/hooks";


export default function Navbar() {
    const user = useAppSelector((state: RootState) => state.auth.user);

  return (
    <AppBar position="sticky" sx={{ background: "#2E3B55" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">Dashboard</Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <AvatarComponent />
          <Typography variant="h6">
                Halo, {user?.name}
            </Typography>
          <LogoutButton />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
