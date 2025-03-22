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
  Box,
} from "@mui/material";
import { getUsers, setSelectedUser, User } from "@/store/slices/userSilces";
import { RootState } from "@/store/store";
import EditDialog from "../molecules/Dialog";
import { styled } from "@mui/system";

const StyledContainer = styled(Box)({
  maxWidth: "100%",
  overflowX: "auto",
  borderRadius: "10px",
  boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
  backgroundColor: "#fff",
});

const StyledTableHead = styled(TableHead)({
  backgroundColor: "#4A90E2",
  maxWidth: "100%",

  "& th": {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    padding: "12px",
  },
});

const ActionButton = styled(Button)({
  fontWeight: "bold",
  color: "#fff",
  backgroundColor: "#4A90E2",
  "&:hover": {
    backgroundColor: "#357ABD",
  },
  fontSize: "14px",
  padding: "6px 12px",
});

const TitleTypography = styled(Typography)({
  textAlign: "center",
  fontWeight: "bold",
  padding: "16px",
  color: "#333",
  fontSize: "22px",
  "@media (max-width: 600px)": {
    fontSize: "18px",
  },
});

export default function Tables() {
  const dispatch = useAppDispatch();
  const { users, loading, error } = useAppSelector(
    (state: RootState) => state.users
  );
  const [open, setOpen] = useState(false);

  const handleEdit = (user: User) => {
    dispatch(setSelectedUser(user));
    setOpen(true);
  };

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    // <TableWrapper>
      <StyledContainer>
        <TableContainer component={Paper}>
          <TitleTypography variant="h5">User List</TitleTypography>

          {loading && (
            <CircularProgress sx={{ display: "block", mx: "auto", my: 2 }} />
          )}
          {error && <Typography color="error">{error}</Typography>}

          <Table>
            <StyledTableHead>
              <TableRow>
                <TableCell>No. </TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </StyledTableHead>
            <TableBody>
              {users?.map((user, index) => (
                <TableRow
                  key={user.id}
                  sx={{
                    "&:nth-of-type(even)": { backgroundColor: "#F7F9FC" },
                    "&:hover": { backgroundColor: "#E3F2FD" },
                  }}
                >
                  <TableCell sx={{ textAlign: "center", fontSize: "14px" }}>
                    {index + 1}
                  </TableCell>

                  <TableCell sx={{ textAlign: "center", fontSize: "14px" }}>
                    {user.name}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center", fontSize: "14px" }}>
                    {user.email}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <ActionButton
                      variant="contained"
                      size="small"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </ActionButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <EditDialog open={open} onClose={() => setOpen(false)} />
      </StyledContainer>
  );
}
