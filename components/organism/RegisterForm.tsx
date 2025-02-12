"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";
import { useRouter } from "next/navigation";
import { registerUserThunk } from "@/store/slices/authSlices";

const FormContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  background: "linear-gradient(to right, #4A90E2, #8E44AD)",
  padding: "16px",
});

const StyledPaper = styled(Paper)({
  maxWidth: "400px",
  width: "100%",
  padding: "32px",
  textAlign: "center",
  borderRadius: "12px",
  boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
});

const StyledButton = styled(Button)({
  fontWeight: "bold",
  padding: "10px 16px",
});

export default function RegisterForm() {
  const dispatch = useAppDispatch();
  const { loading, successMessage, error } = useAppSelector((state) => state.auth);
  const router = useRouter();

  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = () => {
    dispatch(registerUserThunk(formData));
  };

  return (
    <FormContainer>
      <StyledPaper elevation={6}>
        <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: "16px" }}>Register</Typography>

        <TextField
          label="Name"
          name="name"
          fullWidth
          variant="outlined"
          sx={{ marginBottom: "16px" }}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          name="email"
          fullWidth
          variant="outlined"
          sx={{ marginBottom: "16px" }}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          variant="outlined"
          sx={{ marginBottom: "16px" }}
          onChange={handleChange}
        />

        {loading ? <CircularProgress sx={{ marginBottom: "16px" }} /> : null}
        {successMessage && <Typography color="primary">{successMessage}</Typography>}
        {error && <Typography color="error">{error}</Typography>}

        <StyledButton fullWidth variant="contained" onClick={handleRegister} disabled={loading}>
          Register
        </StyledButton>

        <Typography sx={{ marginTop: "12px", cursor: "pointer", color: "#4A90E2" }} onClick={() => router.push("/login")}>
          Already have an account? Login
        </Typography>
      </StyledPaper>
    </FormContainer>
  );
}
