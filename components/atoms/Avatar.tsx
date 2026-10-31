"use client";

import { Avatar } from "@mui/material";
import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";

export default function AvatarComponent() {
  const user = useAppSelector((state: RootState) => state.auth.user);

  if (!user) return <Avatar />;

  return <Avatar alt={user.name} src={user.profilePicture || ""} />;
}
