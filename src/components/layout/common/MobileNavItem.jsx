import { Stack, Typography, useTheme } from "@mui/material";
import { NavLink } from "react-router-dom";

const MobileNavItem = ({ path, icon, label }) => {
  const theme = useTheme();

  return (
    <NavLink
      to={path}
      style={({ isActive }) => ({
        textDecoration: "none",
        color: isActive
          ? "#FF1100"
          : theme.palette.text.primary,
      })}
    >
      {({ isActive }) => (
        <Stack
          alignItems="center"
          spacing={0.3}
          sx={{
            px: 1,
            py: 0.5,
            borderBottom: isActive
              ? "2px solid #FF1100"
              : "2px solid transparent",
            transition: "all 0.25s ease",
            opacity: isActive ? 1 : 0.75,
          }}
        >
          {icon}
          <Typography
            variant="caption"
            fontWeight={isActive ? 600 : 400}
          >
            {label}
          </Typography>
        </Stack>
      )}
    </NavLink>
  );
};

export default MobileNavItem;
