import { Button, useTheme } from "@mui/material";
import { NavLink } from "react-router-dom";

const OwnerNavItem = ({ label, icon, path }) => {
  const theme = useTheme();

  return (
    <NavLink to={path} style={{ textDecoration: "none" }}>
      {({ isActive }) => (
        <Button
          fullWidth
          startIcon={icon}
          sx={{
            justifyContent: "flex-start",
            textTransform: "none",
            borderRadius: 2,
            px: 2,
            py: 1.3,
            fontWeight: 500,
            transition: "all 0.25s ease",
            color: isActive
              ? "#fff"
              : theme.palette.text.primary,
            backgroundColor: isActive ? "#FF1100" : "transparent",
            "&:hover": {
              backgroundColor: "#FF1100",
              color: "#fff",
            },
          }}
        >
          {label}
        </Button>
      )}
    </NavLink>
  );
};

export default OwnerNavItem;
