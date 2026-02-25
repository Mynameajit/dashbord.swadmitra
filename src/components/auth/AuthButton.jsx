import { Button, CircularProgress } from "@mui/material";

const AuthButton = ({ text, loading, icon, variant, onClick,...props }) => (
  <Button
    fullWidth
    disabled={loading}
    sx={{
      mt: 2,
      py: 1.2,
      borderRadius: 3,
      fontWeight: 600,
      background:
        variant === "google" ? "rgba(0,0,0,0.2)" : "#FF1100",
      color: variant === "google" ? "black" : "white",
      "&:hover": {
        background:
          variant === "google" ? "rgba(0,0,0,0.4)" : "#dd0b00",
      },
    }}
     {...props}
  onClick={onClick}
  >
    {loading ? <CircularProgress size={22} /> : icon || text}
  </Button>
);

export default AuthButton;
