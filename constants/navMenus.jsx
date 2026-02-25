import {
  Home,
  ShoppingBag,
  AddCircleOutline,
  RestaurantMenu,
  Person,
} from "@mui/icons-material";

export const ownerNavMenu = [
  {
    label: "Dashboard",
    path: "/owner/dashboard",
    icon: <Home fontSize="small" />,
  },
  {
    label: "Orders",
    path: "/owner/orders",
    icon: <ShoppingBag fontSize="small" />,
  },
  {
    label: "Add Item",
    path: "/owner/add-item",
    icon: <AddCircleOutline fontSize="small" />,
  },
  {
    label: "Items",
    path: "/owner/items",
    icon: <RestaurantMenu fontSize="small" />,
  },
  {
    label: "Profile",
    path: "/owner/profile",
    icon: <Person fontSize="small" />,
  },
];
