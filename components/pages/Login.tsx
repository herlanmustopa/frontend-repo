
import { LoginForm } from "../organism/LoginForm";
import { AuthLayout } from "../templates/AuthLayout";


const LoginPage = () => {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;
