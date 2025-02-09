import { Button as MUIButton } from "@mui/material";

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: "text" | "contained" | "outlined";
  color?: "primary" | "secondary" | "success";
}

export const Button = ({ label, onClick, variant = "contained", color = "primary" }: ButtonProps) => {
  return (
    <MUIButton variant={variant} color={color} onClick={onClick}>
      {label}
    </MUIButton>
  );
};
