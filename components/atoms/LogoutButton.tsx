"use client";

import { Button } from "@mui/material";
import { useAppDispatch } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { logout } from "@/store/slices/authSlices";

export default function LogoutButton() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  return (
    <Button variant="contained" color="error" onClick={handleLogout}>
      Logout
    </Button>
  );
}
