import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Grid,
  Divider,
  Chip,
  Stack,
  Paper,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ACCENT = "#FF1100";

const getStatusColor = (status) => {
  switch (status) {
    case "Pending": return "#f57c00";
    case "Accepted": return "#1976d2";
    case "Preparing": return "#9c27b0";
    case "Out For Delivery": return "#0288d1";
    case "Delivered": return "#2e7d32";
    case "Cancelled": return "#d32f2f";
    default: return "#555";
  }
};

export const OrderDetailsDialog = ({ open, handleClose, order }) => {
  const theme = useTheme();
  if (!order) return null;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: {
          borderRadius: 4,
          background:
            theme.palette.mode === "dark"
              ? "rgba(0,0,0,1)"
              : "rgba(250,250,250,0.95)",
        },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: 800,
          color: ACCENT,
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        📦 Shop Order Details

        <IconButton
          onClick={handleClose}
          sx={{ position: "absolute", right: 15, top: 12 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ py: 3 }}>

        {/* BASIC INFO */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography><b>Order ID:</b> {order.parentOrderId}</Typography>
            <Typography>
              <b>Date:</b> {new Date(order.orderDate).toLocaleString()}
            </Typography>
            <Typography>
              <b>Customer:</b> {order.customerName}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography><b>Shop Status:</b></Typography>
            <Chip
              label={order.status}
              sx={{
                mt: 1,
                backgroundColor: getStatusColor(order.status),
                color: "#fff",
                fontWeight: 600,
              }}
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* DELIVERY ADDRESS */}
        <Typography variant="h6" sx={{ mb: 2, color: ACCENT }}>
          🚚 Delivery Address
        </Typography>

        <Paper
          sx={{
            p: 2,
            borderRadius: 3,
            background:
              theme.palette.mode === "dark"
                ? "rgba(255,255,255,0.05)"
                : "#f9f9f9",
          }}
        >
          <Typography fontWeight={700}>
            {order.parentOrder?.deliveryAddress?.name}
          </Typography>

          <Typography>
            {order.parentOrder?.deliveryAddress?.buildingName},{" "}
            {order.parentOrder?.deliveryAddress?.landmark}
          </Typography>

          <Typography>
            {order.parentOrder?.deliveryAddress?.city},{" "}
            {order.parentOrder?.deliveryAddress?.state} -{" "}
            {order.parentOrder?.deliveryAddress?.pinCode}
          </Typography>

          <Typography>
            Mobile: {order.parentOrder?.deliveryAddress?.mobile}
          </Typography>
        </Paper>

        <Divider sx={{ my: 3 }} />

        {/* ITEMS */}
        <Typography variant="h6" sx={{ mb: 2, color: ACCENT }}>
          🛒 Ordered Items ({order.shopOrderItems.length})
        </Typography>

        <Grid container spacing={2}>
          {order.shopOrderItems.map((item) => (
            <Grid item xs={12} key={item._id}>
              <Paper
                sx={{
                  p: 2,
                  borderRadius: 3,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  background:
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.05)"
                      : "#fafafa",
                }}
              >
                <Box
                  component="img"
                  src={item.item?.image}
                  alt={item.name}
                  sx={{
                    width: 90,
                    height: 90,
                    borderRadius: 2,
                    objectFit: "cover",
                  }}
                />

                <Box flex={1}>
                  <Typography fontWeight={700}>
                    {item.name}
                  </Typography>

                  <Typography>
                    Qty: {item.qty}
                  </Typography>

                  <Typography>
                    Price: ₹{item.price}
                  </Typography>
                </Box>

                <Typography fontSize={16} fontWeight={800}>
                  ₹{item.total}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* TOTAL */}
        <Stack alignItems="flex-end">
          <Typography fontSize={18} fontWeight={800}>
            Shop Subtotal: ₹{order.subTotal}
          </Typography>
        </Stack>

      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsDialog;
