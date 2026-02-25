import { Stack, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import { ownerNavMenu } from "../../../../constants/navMenus";
import OwnerSidebar from "./OwnerSidebar";
import BackgroundCircles from "../../ui/BackgroundCircles";
import MobileNav from "../../common/MobileNav";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import AddBoxIcon from "@mui/icons-material/AddBox";

import { Person } from "@mui/icons-material";

const OwnerNavItems = [
  {
    label: "Dashboard",
    path: "/owner/dashboard",
    icon: <DashboardIcon />,
  },
  {
    label: "Orders",
    path: "/owner/orders",
    icon: <ReceiptLongIcon />,
  },
  {
    label: "Items",
    path: "/owner/items",
    icon: <Inventory2Icon />,
  },
  {
    label: "Add item",
    path: "/owner/add-item",
    icon: <AddBoxIcon />,
  },

  {
    label: "Profile",
    path: "/owner/profile",
    icon: <Person />,
  },
];

const OwnerDashboardLayout = () => {
  const theme = useTheme();

  return (
    <Stack
      width="100%"
      height="100vh"
      direction="row"
      overflow="hidden"
      bgcolor={theme.palette.background.default}
    >
      <BackgroundCircles />
      {/* ================= MOBILE NAV ================= */}
        <MobileNav navbarLinks={OwnerNavItems} bg={true} />


      {/* ================= SIDEBAR ================= */}
      <Stack
        width={280}
        minWidth={280}
        height="100vh"
        position="sticky"
        top={0}
        zIndex={10}
        sx={{
          display: { xs: "none", md: "flex" },
          borderRight: `1px solid ${
            theme.palette.mode === "dark"
              ? "rgba(255,255,255,0.08)"
              : "rgba(0,0,0,0.08)"
          }`,
          background:
            theme.palette.mode === "dark"
              ? "rgba(0,0,0,0.05)"
              : "rgba(0,0,0,0.02)",
        }}
      >
             <OwnerSidebar navbarLinks={ownerNavMenu} />

      </Stack>

      {/* ================= MAIN CONTENT ================= */}
      <Stack flex={1} height="100vh" overflow="hidden" width={"100%"}>
        {/* Scrollable content area */}
        <Stack
          width={"100%"}
          flex={1}
          px={{ xs: 1.5, md: 3 }}
          py={2}
          pb={{ xs: 8, md: 1 }}
          overflow="auto"
          sx={{
            background:
              theme.palette.mode === "dark"
                ? "rgba(255,255,255,0.02)"
                : "rgba(0,0,0,0.01)",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Outlet />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default OwnerDashboardLayout;
