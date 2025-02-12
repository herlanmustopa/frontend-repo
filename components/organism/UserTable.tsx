"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Button,
} from "@mui/material";
import { getUsers, setSelectedUser, User } from "@/store/slices/userSilces";
import { RootState } from "@/store/store";
import EditDialog from "../molecules/Dialog";

export default function UserTable() {
  const dispatch = useAppDispatch();
  const { users, loading, error } = useAppSelector((state: RootState) => state.users);
  const [open, setOpen] = useState(false);


  const handleEdit = (user: User) => {
    dispatch(setSelectedUser(user));
    setOpen(true);
  };

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Typography variant="h6" sx={{ p: 2 }}>
        User List
      </Typography>

      {loading && <CircularProgress sx={{ display: "block", mx: "auto", my: 2 }} />}
      {error && <Typography color="error">{error}</Typography>}

      <Table>
        <TableHead>
          <TableRow>
            {/* <TableCell>ID</TableCell> */}
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users?.map((user) => (
            <TableRow key={user.id}>
              {/* <TableCell>{user.id}</TableCell> */}
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Button variant="outlined" onClick={() => handleEdit(user)}>Edit</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <EditDialog open={open} onClose={() => setOpen(false)} />
    </TableContainer>
  );
}
