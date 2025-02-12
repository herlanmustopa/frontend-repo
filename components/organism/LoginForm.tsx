"use client";

import { useEffect, useState } from "react";
import { Button, Typography, Paper } from "@mui/material";
import { loginUser } from "@/store/slices/authSlices";
import { RootState } from "@/store/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { styled } from "@mui/system";
import { InputField } from "../molecules/InputField";

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

        <InputField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <InputField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <StyledButton fullWidth variant="contained" onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </StyledButton>

        {error && <Typography color="error" sx={{ marginTop: "10px" }}>{error}</Typography>}
      </LoginBox>
  );
};
