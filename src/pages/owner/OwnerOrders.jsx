import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Chip,
  Select,
  MenuItem,
  Stack,
  CircularProgress,
  Pagination,
  useTheme,
  Tooltip,
  IconButton,
  Button,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DownloadIcon from "@mui/icons-material/Download";

import {
  fetchOwnerOrders,
  updateOwnerOrderStatus,
} from "../../features/owner/order/orderService";

import { generateReceipt } from "../../utils/generateReceipt";
import OrderDetailsDialog from "../../components/owner/OrderDetailsDialog";
import OwnerOrdersSkeleton from "../../components/owner/OwnerOrdersLoader";

const ACCENT = "#FF1100";

const STATUS_LIST = [
  "All",
  "Pending",
  "Accepted",
  "Preparing",
  "Out For Delivery",
  "Delivered",
  "Cancelled",
];

const getStatusColor = (status) => {
  switch (status) {
    case "Pending":
      return "#f57c00";
    case "Accepted":
      return "#1976d2";
    case "Preparing":
      return "#9c27b0";
    case "Out For Delivery":
      return "#0288d1";
    case "Delivered":
      return "#2e7d32";
    case "Cancelled":
      return "#d32f2f";
    default:
      return "#555";
  }
};

const OwnerOrders = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { orders, loading, isFetched } = useSelector((state) => state.order);

  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const ordersPerPage = 8;

  useEffect(() => {
    if (!isFetched) {
      dispatch(fetchOwnerOrders());
    }
  }, [dispatch, isFetched]);

  /* ================= FLATTEN SHOP ORDERS ================= */
  const flatOrders = useMemo(() => {
    return (
      orders?.flatMap((order) =>
        order.shopOrders.map((shopOrder) => ({
          ...shopOrder,
          parentOrderId: order._id,
          parentOrder: order,
          customerName: order.user?.fullName,
          orderDate: order.createdAt,
          totalItems: shopOrder.shopOrderItems.reduce(
            (sum, item) => sum + item.qty,
            0,
          ),
        })),
      ) || []
    );
  }, [orders]);

  /* ================= FILTER ================= */
  const filteredOrders = useMemo(() => {
    if (statusFilter === "All") return flatOrders;
    return flatOrders.filter((o) => o.status === statusFilter);
  }, [flatOrders, statusFilter]);

  /* ================= PAGINATION ================= */
  const paginatedOrders = filteredOrders.slice(
    (page - 1) * ordersPerPage,
    page * ordersPerPage,
  );

  /* ================= STATUS UPDATE ================= */
  const handleStatusChange = async (parentId, shopOrderId, newStatus) => {
    setSelectedId(shopOrderId);

    await dispatch(
      updateOwnerOrderStatus({
        orderId: parentId,
        shopOrderId,
        status: newStatus,
      }),
    );

    setSelectedId(null);
  };

  /* ================= LOADER ================= */
  if (loading.fetch) {
    return <OwnerOrdersSkeleton rows={6} />;
  }

  return (
    <Box px={{ xs: 1, md: 3 }} py={4}>
      {/* HEADER */}
      <Typography fontSize={26} fontWeight={900} color={ACCENT} mb={3}>
        📦 Owner Orders Dashboard
      </Typography>

      {/* FILTER */}
      <Stack direction="row"  gap={1} flexWrap="wrap" mb={3}>
        {STATUS_LIST.map((status) => (
          <Button
            key={status}
            variant={statusFilter === status ? "contained" : "outlined"}
            size="small"
            onClick={() => {
              setStatusFilter(status);
              setPage(1);
            }}
            sx={{
              borderColor: ACCENT,
              color: statusFilter === status ? "#fff" : ACCENT,
              bgcolor: statusFilter === status ? ACCENT : "transparent",
              textTransform: "none",
            }}
          >
            {status}
          </Button>
        ))}
      </Stack>

      {/* TABLE */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          backgroundColor:
            theme.palette.mode === "dark"
              ? "rgba(0,0,0,.8)"
              : "rgba(0,0,0,.02)",
        }}
      >
        <TableContainer>
          <Table size="small">
            <TableHead
              sx={{
                backgroundColor:
                  theme.palette.mode === "dark" ? "#1e1e1e" : "#f5f5f5",
              }}
            >
              <TableRow>
                <TableCell>
                  <b>#</b>
                </TableCell>
                <TableCell>
                  <b>Order</b>
                </TableCell>
                <TableCell>
                  <b>Customer</b>
                </TableCell>
                <TableCell>
                  <b>Items</b>
                </TableCell>
                <TableCell>
                  <b>Amount</b>
                </TableCell>
                <TableCell>
                  <b>Status</b>
                </TableCell>
                <TableCell>
                  <b>Date</b>
                </TableCell>
                <TableCell align="right">
                  <b>Actions</b>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    <Stack spacing={2} alignItems="center" py={8}>
                      <Box
                        sx={{
                          width: 70,
                          height: 70,
                          borderRadius: "50%",
                          backgroundColor: "rgba(0,0,0,0.05)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 30,
                        }}
                      >
                        📭
                      </Box>

                      <Typography fontSize="1.1rem" fontWeight={700}>
                        No Orders Available
                      </Typography>

                      <Typography variant="body2" sx={{ opacity: 0.7 }}>
                        Orders will appear here once customers place them.
                      </Typography>
                    </Stack>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedOrders.map((order, i) => (
                  <TableRow key={order._id} hover>
                    <TableCell>{(page - 1) * ordersPerPage + i + 1}</TableCell>

                    <TableCell>#{order.parentOrderId?.slice(-6)}</TableCell>

                    <TableCell>{order.customerName}</TableCell>

                    <TableCell>{order.totalItems} Items</TableCell>

                    <TableCell>₹{order.subTotal}</TableCell>

                    <TableCell>
                      <Chip
                        label={order.status}
                        size="small"
                        sx={{
                          backgroundColor: getStatusColor(order.status),
                          color: "#fff",
                          fontWeight: 600,
                          height: 24,
                          fontSize: "0.75rem",
                        }}
                      />
                    </TableCell>

                    <TableCell>
                      {new Date(order.orderDate).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </TableCell>

                    <TableCell align="right">
                      <Stack
                        direction="row"
                        spacing={1}
                        justifyContent="flex-end"
                      >
                        {loading.update && selectedId === order._id ? (
                          <CircularProgress size={18} />
                        ) : (
                          <Select
                            size="small"
                            value={order.status}
                            disabled={
                              order.status === "Delivered" ||
                              order.status === "Cancelled"
                            }
                            onChange={(e) => {
                              setSelectedId(order._id);
                              handleStatusChange(
                                order.parentOrderId,
                                order._id,
                                e.target.value,
                              );
                            }}
                            sx={{
                              minWidth: 110,
                              height: 30,
                              fontSize: "0.75rem",
                            }}
                          >
                            {STATUS_LIST.slice(1).map((status) => (
                              <MenuItem key={status} value={status}>
                                {status}
                              </MenuItem>
                            ))}
                          </Select>
                        )}

                        <Tooltip title="View Details">
                          <IconButton
                            onClick={() => {
                              setSelectedOrder(order);
                              setOpenDialog(true);
                            }}
                            size="small"
                            sx={{ color: ACCENT }}
                          >
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        {console.log(orders[i])}
                        <Tooltip title="Download Invoice">
                          <IconButton
                            size="small"
                            sx={{ color: ACCENT }}
                            onClick={() =>
                              generateReceipt(orders[i], order?.shop)
                            }
                          >
                            <DownloadIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* PAGINATION */}
      {filteredOrders.length > ordersPerPage && (
        <Stack alignItems="center" mt={3}>
          <Pagination
            count={Math.ceil(filteredOrders.length / ordersPerPage)}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="error"
          />
        </Stack>
      )}

         {/* DIALOG */}
        <OrderDetailsDialog
          open={openDialog}
          handleClose={() => setOpenDialog(false)}
          order={selectedOrder}
        />
    </Box>
  );
};

export default OwnerOrders;
