'use client'

import { useEffect, useState } from "react";
import { Button } from "../atoms/Button";
import { InputField } from "../molecules/InputField";
import { Typography } from "../atoms/Typography";
import { loginUser } from "@/store/slices/authSlices";
import { RootState } from "@/store/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const { loading, error, token } = useAppSelector((state : RootState) => state.auth);

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
