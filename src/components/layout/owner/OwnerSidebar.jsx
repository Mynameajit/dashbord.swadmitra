import { IconButton, Stack, Typography, useTheme } from "@mui/material";
import { Bedtime, Brightness4, RestaurantMenu } from "@mui/icons-material";
import OwnerNavItem from "./OwnerNavItem";
import SidebarFooter from "./SidebarFooter";
import { useThemeMode } from "../../../theme/ThemeModeProvider ";
import { useDispatch } from "react-redux";

const OwnerSidebar = ({ navbarLinks }) => {
  const theme = useTheme();
  const dispatch=useDispatch()
  const { toggleTheme } = useThemeMode();

  return (
    <Stack
      height="100%"
      px={2}
      py={3}
      spacing={3}
      sx={{
        background: "transparent",
      }}
    >
      {/* Logo */}
      <Stack direction={"row"} width={"100%"} justifyContent={"space-between"}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <RestaurantMenu sx={{ color: "#FF1100", fontSize: 32 }} />
          <Typography variant="h6" fontWeight={700} sx={{ color: "#FF1100" }}>
            SwadMitra
          </Typography>
        </Stack>

        <IconButton
          onClick={toggleTheme}
          sx={{
            alignSelf: "flex-start",
            color: "#FF1100",
          }}
        >
          {theme.palette.mode === "dark" ? <Bedtime /> : <Brightness4 />}
        </IconButton>
      </Stack>

      {/* Nav Links */}
      <Stack spacing={1}>
        {navbarLinks.map((link, index) => (
          <OwnerNavItem key={index} {...link} />
        ))}
      </Stack>

      {/* Footer (theme + logout) */}
      <SidebarFooter />
    </Stack>
  );
};

export default OwnerSidebar;
