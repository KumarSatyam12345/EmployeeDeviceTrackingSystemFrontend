import { Button } from "@mui/material";

type CustomeButtonProps = {
  onClick: () => void;
  label: string;
  color: "primary" | "secondary";
  variant: "text" | "contained" | "outlined";
};


function CustomeButton({ onClick, label, color, variant }: CustomeButtonProps) {
  return (
    <Button
      color={color}
      style={{ height: "55px" }}
      onClick={onClick}
      variant={variant}
    >
      {label}
    </Button>
  );
}

export default CustomeButton;
