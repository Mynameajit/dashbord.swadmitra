import { Stack, useTheme } from "@mui/material";
import useScrollPosition from "../../hooks/useScrollPosition";
import MobileNavItem from "./MobileNavItem";

const MobileBottomNav = ({ navbarLinks }) => {
  const theme = useTheme();
  const { isScrolled } = useScrollPosition(10);

  return (
    <Stack
      position="fixed"
      bottom={0}
      left={0}
      width="100%"
      height="60px"
      zIndex={100}
      justifyContent="center"
      sx={{
        display: { xs: "flex", md: "none" },
        backdropFilter: isScrolled ? "blur(10px)" : "none",
        background:
          theme.palette.mode === "dark"
            ? isScrolled
              ? "rgba(0,0,0,0.55)"
              : "rgba(0,0,0,0.9)"
            : isScrolled
              ? "rgba(255,255,255,0.7)"
              : "rgba(255,255,255,0.95)",
        borderTop: `1px solid ${
          theme.palette.mode === "dark"
            ? "rgba(255,255,255,0.08)"
            : "rgba(0,0,0,0.08)"
        }`,
        transition: "all 0.3s ease",
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        width="100%"
      >
        {navbarLinks.map((item, index) => (
          <MobileNavItem key={index} {...item} />
        ))}
      </Stack>
    </Stack>
  );
};

export default MobileBottomNav;
