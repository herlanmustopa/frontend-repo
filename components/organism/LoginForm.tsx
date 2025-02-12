"use client";

import { useEffect, useState } from "react";
import { Button, TextField, Typography, Paper } from "@mui/material";
import { loginUser } from "@/store/slices/authSlices";
import { RootState } from "@/store/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { styled } from "@mui/system";

// const LoginContainer = styled(Box)({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   minHeight: "100vh",
//   background: "linear-gradient(to right, #4A90E2, #8E44AD)", 
//   padding: "16px",
// });

const LoginBox = styled(Paper)({
  maxWidth: "400px",
  width: "100%",
  padding: "32px",
  textAlign: "center",
  borderRadius: "12px",
  boxShadow: "0px 4px 10px rgba(0,0,0,0.2)", 
  backgroundColor: "white",
});

const StyledButton = styled(Button)({
  backgroundColor: "#4A90E2",
  color: "white",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#357ABD",
  },
});

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const { loading, error, token } = useAppSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const handleLogin = () => {
    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (token) {
      router.push("/dashboard");
    }
  }, [token, router]);

  return (
      <LoginBox elevation={6}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#333", marginBottom: "16px" }}>
          Login
        </Typography>

        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: "16px" }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: "16px" }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <StyledButton fullWidth variant="contained" onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </StyledButton>

        {error && <Typography color="error" sx={{ marginTop: "10px" }}>{error}</Typography>}
      </LoginBox>
  );
};
