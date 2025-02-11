"use client";

import { Avatar } from "@mui/material";
import { useAppSelector } from "@/store/hooks";

export default function AvatarComponent() {
  const user = useAppSelector((state) => state.auth.user);

  if (!user) return <Avatar />;

  return <Avatar alt={user.name} src={user.profilePicture || ""} />;
}
