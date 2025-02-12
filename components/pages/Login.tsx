"use client";
import { Box } from "@mui/material";
import { LoginForm } from "../organism/LoginForm";
import { AuthLayout } from "../templates/AuthLayout";
import { styled } from "@mui/system";

const Container = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  background: "linear-gradient(to right, #4A90E2, #8E44AD)",
  padding: "16px",
});

const LoginPage = () => {
  return (
    <Container>
      <AuthLayout>
        <LoginForm />
      </AuthLayout>
    </Container>
  );
};

export default LoginPage;
