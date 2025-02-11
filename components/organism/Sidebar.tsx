"use client";

import { Drawer, List} from "@mui/material";
import SidebarMenu from "../molecules/SidebarMenu";

export default function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": { width: 240, boxSizing: "border-box" },
      }}
    >
      <List>
        <SidebarMenu label="Dashboard" path="/dashboard" />
        <SidebarMenu label="Settings" path="/dashboard/settings" />
      </List>
    </Drawer>
  );
}
