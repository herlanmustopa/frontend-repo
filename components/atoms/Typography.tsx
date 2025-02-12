import { Typography as MUITypography } from "@mui/material";

interface TypographyProps {
  text: string;
  variant?: "h1" | "h2" | "h3" | "body1" | "body2";
}

export const Typography = ({ text, variant = "body1" }: TypographyProps) => {
  return <MUITypography variant={variant} className="text-2xl font-bold text-gray-700">{text}</MUITypography>;
};
