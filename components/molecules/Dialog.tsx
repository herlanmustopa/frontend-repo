"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Box,
} from "@mui/material";
import { updateUsers } from "@/store/slices/userSilces";
import { styled } from "@mui/system";

interface EditDialogProps {
  open: boolean;
  onClose: () => void;
}

const StyledDialog = styled(Dialog)({
  "& .MuiDialog-paper": {
    borderRadius: "12px",
    padding: "16px",
    background: "linear-gradient(135deg, #ffffff, #f3f4f6)",
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
  },
});

const StyledTitle = styled(DialogTitle)({
  fontSize: "20px",
  fontWeight: "bold",
  textAlign: "center",
  color: "#333",
});

const StyledTextField = styled(TextField)({
  marginBottom: "16px",
  "& label.Mui-focused": {
    color: "#4A90E2",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#ccc",
    },
    "&:hover fieldset": {
      borderColor: "#4A90E2",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#4A90E2",
    },
  },
});

const StyledButton = styled(Button)({
  fontWeight: "bold",
  borderRadius: "8px",
  padding: "10px 20px",
});

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
    <StyledDialog open={open} onClose={onClose}>
      <StyledTitle>Edit User</StyledTitle>
      <DialogContent>
        <Box sx={{ width: "100%", padding: "10px 0" }}>
          <StyledTextField
            label="Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
          />
          <StyledTextField
            label="Email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <StyledButton onClick={onClose} variant="outlined" color="secondary">
          Cancel
        </StyledButton>
        <StyledButton onClick={handleUpdate} variant="contained" color="primary">
          Save
        </StyledButton>
      </DialogActions>
    </StyledDialog>
  );
}
