import React from "react";
import { Box, useTheme } from "@mui/material";

const BackgroundCircles = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        zIndex: 0,
        pointerEvents: "none", // prevent interference
      }}
    >
      {/* 🩷 Top Left Glow */}
      <Box
        sx={{
          position: "absolute",
          top: "60px",
          left: "8%",
          width: "260px",
          height: "260px",
          borderRadius: "50%",
          background: isDark
            ? "radial-gradient(circle, rgba(255,120,200,0.35), transparent 75%)"
            : "radial-gradient(circle, rgba(255,160,200,0.85), transparent 90%)",
          filter: "blur(70px)",
          opacity: isDark ? 0.9 : 1,
        }}
      />

      {/* 🟣 Center Glow */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "260px",
          height: "260px",
          borderRadius: "50%",
          background: isDark
            ? "radial-gradient(circle, rgba(150,100,255,0.35), transparent 70%)"
            : "radial-gradient(circle, rgba(170,120,255,0.85), transparent 100%)",
          filter: "blur(70px)",
          opacity: isDark ? 0.85 : 1,
        }}
      />

      {/* 🟢 Bottom Right Glow */}
      <Box
        sx={{
          position: "absolute",
          bottom: "60px",
          right: "10%",
          width: "280px",
          height: "280px",
          borderRadius: "50%",
          background: isDark
            ? "radial-gradient(circle, rgba(0,255,180,0.25), transparent 75%)"
            : "radial-gradient(circle, rgba(0,255,200,0.85), transparent 90%)",
          filter: "blur(70px)",
          opacity: isDark ? 0.9 : 1,
        }}
      />
    </Box>
  );
};

export default BackgroundCircles;
