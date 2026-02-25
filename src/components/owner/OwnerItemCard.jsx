import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Stack,
  Button,
  CircularProgress,
  Box,
  Rating,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";

const MotionCard = motion(Card);

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.07 },
  }),
};

const OwnerItemCard = ({
  item = {}, // default empty object
  i,
  onEdit,
  onDelete,
  deleteLoading,
}) => {
  if (!item || Object.keys(item).length === 0) return null;

  const theme = useTheme();
  const {
    name = "Unnamed Item",
    image,
    originalPrice = 0,
    finalPrice = 0,
    discount = 0,
    description = "",
    stock = 0,
    rating = 4.2,
    reviewsCount = 25,
  } = item;

  return (
    <MotionCard
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      custom={i}
      whileHover={{ scale: 1.03 }}
      sx={{
        borderRadius: "18px",
        overflow: "hidden",
        width: "17em",
        height: "100%",
        boxShadow:
          theme.palette.mode === "dark"
            ? "0 8px 25px rgba(0,0,0,0.6)"
            : "0 10px 30px rgba(0,0,0,0.08)",
        backgroundColor:
          theme.palette.mode === "dark"
            ? "rgba(0,0,0,0.8)"
            : theme.palette.background.paper, // 🔥 FIXED
        backdropFilter: theme.palette.mode === "dark" ? "blur(10px)" : "none",
      }}
    >
      {/* IMAGE */}
      <CardMedia
        component="img"
        height={180}
        image={image || "https://via.placeholder.com/300x200?text=No+Image"}
        alt={name}
        sx={{ objectFit: "cover" }}
      />

      {/* CONTENT */}
      <CardContent sx={{ pb: 1 }}>
        <Stack spacing={1}>
          {/* NAME */}
          <Typography fontWeight={700} fontSize={16}>
            {name}
          </Typography>

          {/* ⭐ RATING */}
          <Stack direction="row" alignItems="center" spacing={1}>
            <Rating
              value={Number(rating)}
              precision={0.5}
              readOnly
              size="small"
            />
            <Typography fontSize={13} fontWeight={600}>
              {rating}
            </Typography>
            <Typography fontSize={12} color="text.secondary">
              ({reviewsCount})
            </Typography>
          </Stack>

          {/* PRICE */}
          <Stack direction="row" alignItems="center" spacing={1}>
            {discount > 0 && (
              <Typography
                sx={{
                  textDecoration: "line-through",
                  color: "#9CA3AF",
                  fontSize: 13,
                }}
              >
                ₹{originalPrice}
              </Typography>
            )}

            <Typography
              sx={{
                color: "#16A34A",
                fontWeight: 700,
                fontSize: 16,
              }}
            >
              ₹{finalPrice}
            </Typography>

            {discount > 0 && (
              <Box
                sx={{
                  bgcolor: "rgba(255,17,0,0.1)",
                  color: "#FF1100",
                  fontSize: 11,
                  px: 0.8,
                  py: 0.2,
                  borderRadius: "6px",
                  fontWeight: 600,
                }}
              >
                -{discount}%
              </Box>
            )}
          </Stack>

          {/* DESCRIPTION */}
          {description && (
            <Typography variant="caption" color="text.secondary">
              {description.length > 70
                ? description.slice(0, 70) + "..."
                : description}
            </Typography>
          )}

          {/* STOCK */}
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 600,
              color:
                stock === 0 ? "#DC2626" : stock < 5 ? "#F59E0B" : "#16A34A",
            }}
          >
            {stock === 0 ? "Out of Stock" : `Stock: ${stock}`}
          </Typography>
        </Stack>
      </CardContent>

      {/* ACTIONS */}
      <Stack direction="row" spacing={1} p={2} pt={0}>
        <Button
          fullWidth
          onClick={onEdit}
          sx={{
            bgcolor: "#FF1100",
            color: "#fff",
            textTransform: "none",
            fontWeight: 600,
            borderRadius: "10px",
            "&:hover": {
              bgcolor: "#e60f00",
            },
          }}
        >
          Edit
        </Button>

        <Button
          fullWidth
          onClick={onDelete}
          sx={{
            bgcolor: "#111827",
            color: "#fff",
            textTransform: "none",
            fontWeight: 600,
            borderRadius: "10px",
            "&:hover": {
              bgcolor: "#020617",
            },
          }}
        >
          {deleteLoading ? (
            <CircularProgress size={20} sx={{ color: "#fff" }} />
          ) : (
            "Delete"
          )}
        </Button>
      </Stack>
    </MotionCard>
  );
};

export default OwnerItemCard;
