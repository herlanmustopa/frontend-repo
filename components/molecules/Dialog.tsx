"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from "@mui/material";
import {updateUsers } from "@/store/slices/userSilces";



interface EditDialogProps {
    open: boolean;
    onClose: () => void;
}


export default function EditDialog({ open, onClose }: EditDialogProps) {
    const dispatch = useAppDispatch();
    const selectedUser = useAppSelector((state) => state.users.selectedUser);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
  
    useEffect(() => {
      if (selectedUser) {
        setName(selectedUser.name);
        setEmail(selectedUser.email);
      }
    }, [selectedUser]);
  
    const handleUpdate = () => {
      if (!selectedUser) return;
  
      dispatch(updateUsers({ id: selectedUser.id, name, email }));
      onClose();
    };
  
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField label="Name" fullWidth value={name} onChange={(e) => setName(e.target.value)} />
          <TextField label="Email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleUpdate} variant="contained" color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    );
}
