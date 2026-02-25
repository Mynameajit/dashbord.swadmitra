import React from "react";
import { Box, Typography, CircularProgress, useTheme } from "@mui/material";
import { motion } from "framer-motion";

const DashboardLoader = ({
  title = "Loading Dashboard",
  subtitle = "Please wait while we prepare your workspace…",
}) => {
  const theme = useTheme();
  const accent = "#FF1100";

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh", // topbar height adjust
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // bgcolor: theme.palette.mode === "dark" ? "#0B0B0B" : "#FAFAFA",
      }}
    >
      <Box textAlign="center">
        {/* Animated Logo */}
        <motion.div
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: `linear-gradient(180deg, ${accent}, #ff3b1a)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto",
            boxShadow: "0 8px 22px rgba(255,17,0,0.25)",
            color: "#fff",
            fontWeight: 900,
            fontSize: 18,
            letterSpacing: 1,
          }}
        >
          SM
        </motion.div>

        {/* Title */}
        <Typography
          sx={{
            mt: 1.5,
            fontWeight: 700,
            fontSize: 15,
            color: theme.palette.mode === "dark" ? "#E6EEF8" : "#111827",
          }}
        >
          {title}
        </Typography>

        {/* Spinner */}
        <Box sx={{ mt: 1.5 }}>
          <CircularProgress size={28} thickness={4} sx={{ color: accent }} />
        </Box>

        {/* Subtitle */}
        <Typography
          sx={{
            mt: 1,
            fontSize: 12,
            color:
              theme.palette.mode === "dark"
                ? "rgba(255,255,255,0.65)"
                : "rgba(17,24,39,0.7)",
            maxWidth: 320,
            mx: "auto",
          }}
        >
          {subtitle}
        </Typography>
      </Box>
    </Box>
  );
};

export default DashboardLoader;
