'use client'

import { useState } from "react";
import { Button } from "../atoms/Button";
import { InputField } from "../molecules/InputField";
import { Typography } from "../atoms/Typography";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    alert(`Email: ${email}, Password: ${password}`);
  };

  return (
    <div style={{ width: "300px", margin: "auto", textAlign: "center" }}>
      <Typography text="Login" variant="h3" />
      <InputField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <InputField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button label="Login 2" onClick={handleLogin} />
    </div>
  );
};
