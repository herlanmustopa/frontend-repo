'use client'

import { useState } from "react";
import { Button } from "../atoms/Button";
import { InputField } from "../molecules/InputField";
import { Typography } from "../atoms/Typography";
import { useSelector } from "react-redux";
import { loginUser } from "@/store/slices/authSlices";
import { RootState } from "@/store/store";
import { useAppDispatch } from "@/store/hooks";

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleLogin = () => {
    dispatch(loginUser({ email, password }));
  };
  return (
    <div style={{ width: "300px", margin: "auto", textAlign: "center" }}>
      <Typography text="Login" variant="h3" />
      <InputField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <InputField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={handleLogin} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </Button>
      {error && <p>Error: {error}</p>}
    </div>
  );
};
