"use client";

import { ListItem, ListItemText } from "@mui/material";
import Link from "next/link";

export default function SidebarMenu({ label, path }: { label: string; path: string }) {
  return (
    <Link href={path} style={{ textDecoration: "none", color: "inherit" }}>
      <ListItem>
        <ListItemText primary={label} />
      </ListItem>
    </Link>
  );
}
