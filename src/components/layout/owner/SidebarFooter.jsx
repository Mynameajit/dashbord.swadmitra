import { Stack, Button, IconButton, useTheme } from "@mui/material";
import { Logout, } from "@mui/icons-material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logoutOwner } from "../../../features/auth/authService";

const SidebarFooter = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(logoutOwner())
  };

  return (
    <Stack spacing={1.5} mt="auto">
      {/* Theme Toggle */}
     
      {/* Logout */}
      <Button
        onClick={handleLogout}
        startIcon={<Logout />}
        fullWidth
        sx={{
          justifyContent: "flex-start",
          textTransform: "none",
          borderRadius: 2,
          py: 1.2,
          color: theme.palette.text.primary,
          "&:hover": {
            backgroundColor: "#FF1100",
            color: "#fff",
          },
        }}
      >
        Logout
      </Button>
    </Stack>
  );
};

export default SidebarFooter;
