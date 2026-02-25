import React, { useEffect } from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  Chip,
  useTheme,
  Divider,
  Paper,
  CircularProgress,
} from "@mui/material";
import {
  Email,
  Phone,
  Edit,
  AccessTime,
  Store,
  Verified,
  Inventory2,
  CalendarToday,
  Person,
  Badge,
  LocationCity,
  Public,
  PinDrop,
  Home,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { getShop, toggleShopOpen } from "../../features/owner/shop/shopService";

const OwnerProfile = () => {
  const theme = useTheme();
  const { shop } = useSelector((state) => state.shop);
  const { items } = useSelector((state) => state.item);
  const { user } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.shop);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getShop());
  }, [dispatch]);

  const handleToggleShopOpen = (shopId) => {
    dispatch(toggleShopOpen({ shopId }));
  };

  if (!shop) return null;

  const owner = shop?.owner;

  const InfoRow = ({ icon, label, value }) => (
    <Stack direction="row" spacing={1.5} alignItems="center" width="100%">
      {React.cloneElement(icon, {
        fontSize: "small",
        sx: { color: theme.palette.primary.main },
      })}
      <Typography variant="body2">
        <strong>{label}:</strong> {value || "-"}
      </Typography>
    </Stack>
  );

  return (
    <Box>
      {/* MAIN CONTAINER */}
      <Paper
        elevation={0}
        sx={{
          maxWidth: 1400,
          borderRadius: 4,
          p: { xs: 2, md: 4 },
          backgroundColor: "transparent",
        }}
      >
        <Stack direction={{ xs: "column", md: "row" }} spacing={4} width="100%">
          {/* ================= LEFT SIDE ================= */}
          <Stack width={{ xs: "100%", md: "45%" }} spacing={3}>
            {/* Shop Image */}
            <Box
              component="img"
              src={shop.image}
              alt="shop"
              sx={{
                width: "100%",
                height: 300,
                objectFit: "cover",
                borderRadius: 3,
                boxShadow:
                  theme.palette.mode === "dark"
                    ? "0 6px 20px rgba(0,0,0,0.6)"
                    : "0 6px 20px rgba(0,0,0,0.15)",
              }}
            />

            {/* Basic Info */}
            <Stack spacing={2}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="h5" fontWeight={700}>
                  {shop.name}
                </Typography>

                <Chip
                  label={shop.category?.toUpperCase()}
                  color="primary"
                  size="small"
                />
              </Stack>

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <InfoRow
                  icon={<AccessTime />}
                  label="Timing"
                  value="9:00 AM - 10:00 PM"
                />

                <Stack direction="row" spacing={1}>
                  <Chip
                    label={shop.isOpenNow ? "Active" : "Close"}
                    color={shop.isOpenNow ? "success" : "error"}
                    size="small"
                  />
                  <Chip
                    label={shop.status}
                    icon={<Verified />}
                    color="info"
                    size="small"
                  />
                </Stack>
              </Stack>

              <InfoRow
                icon={<Inventory2 />}
                label="Total Items"
                value={items?.length}
              />
            </Stack>

            <Divider />

            {/* Shop Meta */}
            <Stack spacing={2}>
              <Typography variant="h6" fontWeight={600}>
                Shop Information
              </Typography>

              <InfoRow icon={<Store />} label="Shop ID" value={shop._id} />

              <InfoRow
                icon={<CalendarToday />}
                label="Created On"
                value={dayjs(shop.createdAt).format("DD MMM YYYY")}
              />

              <InfoRow
                icon={<CalendarToday />}
                label="Last Updated"
                value={dayjs(shop.updatedAt).format("DD MMM YYYY")}
              />
            </Stack>
          </Stack>

          {/* ================= RIGHT SIDE ================= */}
          <Stack width={{ xs: "100%", md: "55%" }} spacing={4}>
            {/* Header */}
            <Stack spacing={2}>
              <Typography variant="h5" fontWeight={700}>
                Owner Details
              </Typography>

              <Stack direction="row" spacing={2}>
                <Chip
                  label="Verified Food Business"
                  variant="outlined"
                  color="success"
                  size="small"
                />
                <Chip
                  label={shop.status === "approved" ? "Approved" : "Pending"}
                  color="info"
                  size="small"
                />
              </Stack>

              <Divider />
            </Stack>

            {/* User Details */}
            <Stack spacing={3}>
              <Typography variant="h6" fontWeight={600}>
                User Details
              </Typography>

              <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
                <InfoRow
                  icon={<Person />}
                  label="Name"
                  value={user?.fullName}
                />
                <InfoRow icon={<Badge />} label="Role" value={user?.role} />
              </Stack>

              <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
                <InfoRow icon={<Email />} label="Email" value={user?.email} />
                <InfoRow icon={<Phone />} label="Mobile" value={user?.mobile} />
              </Stack>

              <Divider />

              {/* Address */}
              <Typography variant="h6" fontWeight={600}>
                Address Details
              </Typography>

              <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
                <InfoRow
                  icon={<LocationCity />}
                  label="City"
                  value={shop.city}
                />
                <InfoRow icon={<Public />} label="State" value={shop.state} />
              </Stack>

              <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
                <InfoRow
                  icon={<PinDrop />}
                  label="Pin Code"
                  value={shop.pinCode}
                />
                <InfoRow
                  icon={<Phone />}
                  label="Shop Mobile"
                  value={shop.mobile}
                />
              </Stack>

              <InfoRow
                icon={<Home />}
                label="Full Address"
                value={shop.address}
              />
            </Stack>

            <Divider />

            {/* Buttons */}
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button
                variant="outlined"
                startIcon={<Edit />}
                sx={{ textTransform: "none" }}
              >
                Edit Shop
              </Button>

              <Button
                onClick={() => handleToggleShopOpen(shop._id)}
                variant="contained"
                color={shop.isOpenNow ? "error" : "success"}
                sx={{ textTransform: "none" }}
              >
                {loading.toggleShop ? (
                  <>
                    <CircularProgress size={22} sx={{ color: "#fff", mr: 1 }} />
                    {shop.isOpenNow ? "Closing" : "Opening"}
                  </>
                ) : (
                  <>{shop.isOpenNow ? "Close Shop" : "Activate Shop"}</>
                )}
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
};

export default OwnerProfile;
