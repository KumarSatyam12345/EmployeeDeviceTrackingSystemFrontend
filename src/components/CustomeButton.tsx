import { Button } from "@mui/material";

type CustomeButtonProps = {
  readonly onClick: () => void;
  readonly label: string;
  readonly color: "primary" | "secondary";
  readonly variant: "text" | "contained" | "outlined";
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
