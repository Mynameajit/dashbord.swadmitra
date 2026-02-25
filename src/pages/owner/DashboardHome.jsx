import React, { useEffect, useMemo } from "react";
import {
  Grid,
  Stack,
  Typography,
  Card,
  CardContent,
  Box,
  useTheme,
} from "@mui/material";
import {
  ShoppingBag,
  CurrencyRupee,
  RestaurantMenu,
  PendingActions,
} from "@mui/icons-material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { fetchOwnerOrders } from "../../features/owner/order/orderService";
import { getMyItems } from "../../features/owner/item/itemService";

const ACCENT = "#FF1100";
const PIE_COLORS = ["#16A34A", "#DC2626"];

const DashboardHome = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { orders = [] } = useSelector((state) => state.order);
  const { items = [] } = useSelector((state) => state.item);

  // ================= FETCH + REALTIME =================
  useEffect(() => {
    dispatch(fetchOwnerOrders());
    dispatch(getMyItems());

    const interval = setInterval(() => {
      dispatch(fetchOwnerOrders());
      dispatch(getMyItems());
    }, 30000);

    return () => clearInterval(interval);
  }, [dispatch]);

  // ================= TODAY STATS =================
  const today = new Date().toDateString();

  const todayOrders = orders.filter(
    (o) => new Date(o.createdAt).toDateString() === today,
  );

  const todayRevenue = todayOrders.reduce((sum, o) => sum + o.totalAmount, 0);
  
const pendingOrders = orders.reduce((total, order) => {
  const count = order.shopOrders.filter(
    (shopOrder) => shopOrder.status === "Pending"
  ).length;

  return total + count;
}, 0);

  // ================= LOW STOCK =================
  const lowStockItems = items.filter((item) => item.stock <= 5);

  // ================= REVIEWS =================
  const customerReviews = items.flatMap(
    (item) =>
      item.reviews?.map((review) => ({
        name: review.userName,
        rating: review.rating,
        comment: review.comment,
      })) || [],
  );

  // ================= CHART DATA =================
  const chartData = useMemo(() => {
    const data = [];

    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);

      const dayStr = d.toDateString();

      const dayOrders = orders.filter(
        (o) => new Date(o.createdAt).toDateString() === dayStr,
      );

      data.push({
        day: d.toLocaleDateString("en-US", { weekday: "short" }),
        orders: dayOrders.length,
        revenue: dayOrders.reduce((sum, o) => sum + o.totalAmount, 0),
      });
    }

    return data;
  }, [orders]);

  // ================= PIE DATA =================
  const pieData = useMemo(() => {
    const veg = items.filter((item) => item.foodType === "Veg").length;

    const nonVeg = items.filter((item) => item.foodType === "Non-Veg").length;

    return [
      { name: "Veg", value: veg },
      { name: "Non-Veg", value: nonVeg },
    ];
  }, [items]);

  // ================= CARD BG =================
  const cardBg = theme.palette.mode === "dark" ? "rgba(0,0,0,0.8)" : "#ffffff";

  const stats = [
    {
      title: "Today's Orders",
      value: todayOrders.length,
      icon: <ShoppingBag />,
      color: ACCENT,
    },
    {
      title: "Today's Revenue",
      value: `₹${todayRevenue}`,
      icon: <CurrencyRupee />,
      color: "#16A34A",
    },
    {
      title: "Total Items",
      value: items.length,
      icon: <RestaurantMenu />,
      color: "#2563EB",
    },
    {
      title: "Pending Orders",
      value: pendingOrders,
      icon: <PendingActions />,
      color: "#F59E0B",
    },
  ];

  return (
    <Box sx={{ width: "100%", px: { xs: 1, md: 3 }, py: 2 }}>
      <Typography fontSize={26} fontWeight={700} mb={3}>
        Owner Dashboard
      </Typography>

      {/* ================= TOP STATS ================= */}
      <Grid container spacing={2} mb={4}>
        {stats.map((stat, i) => (
          <Grid item xs={12} sm={6} lg={3} key={i}>
            <Card sx={{ borderRadius: 3, background: cardBg, width: "17rem" }}>
              <CardContent>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      bgcolor: `${stat.color}20`,
                      color: stat.color,
                      p: 1.5,
                      borderRadius: 2,
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Stack>
                    <Typography variant="body2" color="text.secondary">
                      {stat.title}
                    </Typography>
                    <Typography fontSize={22} fontWeight={700}>
                      {stat.value}
                    </Typography>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* ================= ORDERS CHART ================= */}
      <Card sx={{ borderRadius: 3, mb: 4, background: cardBg }}>
        <CardContent>
          <Typography fontWeight={700} mb={2}>
            Orders Overview (Last 7 Days)
          </Typography>

          <Box sx={{ width: "100%", height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="orders"
                  stroke={ACCENT}
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </CardContent>
      </Card>

      {/* ================= REVENUE + PIE ================= */}
      <Stack width="100%" direction="row" spacing={2}>
        <Card sx={{ borderRadius: 3, width: "50%", background: cardBg }}>
          <CardContent>
            <Typography fontWeight={700} mb={2}>
              Revenue (7 Days)
            </Typography>

            <Box sx={{ width: "100%", height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#16A34A" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ borderRadius: 3, width: "50%", background: cardBg }}>
          <CardContent>
            <Typography fontWeight={700} mb={2}>
              Item Distribution
            </Typography>

            <Box sx={{ width: "100%", height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    innerRadius={70}
                    outerRadius={110}
                    dataKey="value"
                  >
                    {pieData.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>
      </Stack>

      {/* ================= LOW STOCK + REVIEWS ================= */}
      <Stack mt={2} width="100%" direction="row" spacing={2}>
        <Card
          sx={{
            borderRadius: 3,
            maxHeight: 160,
            height: 400,
            width: "50%",
            background: cardBg,
          }}
        >
          <CardContent>
            <Typography fontWeight={700} mb={2}>
              Low Stock Items ⚠️
            </Typography>

            <Stack spacing={1} sx={{ maxHeight: 60, overflowY: "auto" }}>
              {lowStockItems?.length === 0 ? (
                <Box
                  sx={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "text.secondary",
                  }}
                >
                  <Typography fontSize={14}>🎉 No Low Stock Items</Typography>
                </Box>
              ) : (
                lowStockItems.map((item, i) => (
                  <Stack
                    key={i}
                    direction="row"
                    justifyContent="space-between"
                    sx={{
                      p: 1,
                      borderRadius: 2,
                      bgcolor:
                        theme.palette.mode === "dark"
                          ? "rgba(255,17,0,0.15)"
                          : "rgba(255,17,0,0.05)",
                    }}
                  >
                    <Typography fontSize={14}>{item.name}</Typography>
                    <Typography fontWeight={700} color="error">
                      {item.stock} left
                    </Typography>
                  </Stack>
                ))
              )}
            </Stack>
          </CardContent>
        </Card>

        <Card
          sx={{
            borderRadius: 3,
            maxHeight: 160,
            height: 400,
            width: "50%",
            background: cardBg,
          }}
        >
          <CardContent>
            <Typography fontWeight={700} mb={2}>
              Customer Reviews ⭐
            </Typography>

            <Stack spacing={1} sx={{ maxHeight: 160, overflowY: "auto" }}>
              {customerReviews?.length === 0 ? (
                <Box
                  sx={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "text.secondary",
                  }}
                >
                  <Typography fontSize={14}>
                    ⭐ No Customer Reviews Yet
                  </Typography>
                </Box>
              ) : (
                customerReviews.map((review, i) => (
                  <Stack
                    key={i}
                    spacing={0.5}
                    sx={{
                      p: 1.2,
                      borderRadius: 2,
                      bgcolor:
                        theme.palette.mode === "dark"
                          ? "rgba(255,255,255,0.05)"
                          : "rgba(0,0,0,0.04)",
                    }}
                  >
                    <Stack direction="row" justifyContent="space-between">
                      <Typography fontWeight={600} fontSize={14}>
                        {review.name}
                      </Typography>
                      <Typography fontSize={13}>
                        {"⭐".repeat(review.rating)}
                      </Typography>
                    </Stack>

                    <Typography fontSize={13} color="text.secondary">
                      {review.comment}
                    </Typography>
                  </Stack>
                ))
              )}
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
};

export default DashboardHome;
