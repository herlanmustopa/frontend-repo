import { TextField } from "@mui/material";

interface InputFieldProps {
  label: string;
  type?: "text" | "password" | "email";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputField = ({ label, type = "text", value, onChange }: InputFieldProps) => {
  return <TextField label={label} type={type} value={value} onChange={onChange} fullWidth />;
};
