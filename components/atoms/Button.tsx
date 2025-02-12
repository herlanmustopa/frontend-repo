import { Button as MUIButton } from "@mui/material";

interface ButtonProps {
  label?: string;
  onClick?: () => void;
  variant?: "text" | "contained" | "outlined";
  color?: "primary" | "secondary" | "success";
  disabled?: boolean;
  children?: React.ReactNode;
}

export const Button = ({ label, onClick, variant = "contained", color = "primary", disabled, children }: ButtonProps) => {
  return (
    <MUIButton variant={variant} color={color} onClick={onClick} disabled={disabled} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition">
      {label}
      { children }
    </MUIButton>
  );
};
