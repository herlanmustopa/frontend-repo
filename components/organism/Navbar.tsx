"use client";

import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import AvatarComponent from "../atoms/Avatar";
import LogoutButton from "../atoms/LogoutButton";
<<<<<<< HEAD
import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";


export default function Navbar() {
      const user = useAppSelector((state: RootState) => state.auth.user);
=======
import { RootState } from "@/store/store";
import { useAppSelector } from "@/store/hooks";


export default function Navbar() {
    const user = useAppSelector((state: RootState) => state.auth.user);
>>>>>>> 0d0ae4be303d1942f506ca45bb3c9d4e01790216

  return (
    <AppBar position="sticky" sx={{ background: "#2E3B55" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">Dashboard</Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <AvatarComponent />
<<<<<<< HEAD
            <Typography variant="h6">
                Halo, {user.name}
=======
          <Typography variant="h6">
                Halo, {user?.name}
>>>>>>> 0d0ae4be303d1942f506ca45bb3c9d4e01790216
            </Typography>
          <LogoutButton />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
