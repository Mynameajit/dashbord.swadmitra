import React, { useEffect } from "react";
import { Stack, Typography, Button, useTheme } from "@mui/material";
import { HourglassTop, ContactSupport } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import BackgroundCircles from "../../components/ui/BackgroundCircles";
import { useSelector } from "react-redux";

const MotionStack = motion(Stack);
const MotionButton = motion(Button);

const ApprovalPending = () => {
  const { user } = useSelector((state) => state.user);

  const theme = useTheme();
  const navigate = useNavigate();
  useEffect(() => {
    if (user && user.status === "approved") {
      navigate("/owner/dashboard");
    }
  }, [user, navigate]);

  return (
    <Stack
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
      position="relative"
      px={2}
    >
      <BackgroundCircles />

      <MotionStack
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        spacing={3}
        alignItems="center"
        maxWidth={520}
        width="100%"
        p={{ xs: 3, md: 4 }}
        borderRadius={3}
        sx={{
          background:
            theme.palette.mode === "dark"
              ? "rgba(255,255,255,0.04)"
              : "#ffffff",
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 0 12px rgba(255,255,255,0.06)"
              : "0 12px 30px rgba(0,0,0,0.1)",
          zIndex: 2,
        }}
      >
        {/* ICON */}
        <Stack
          sx={{
            height: "4.5rem",
            width: "4.5rem",
            borderRadius: "50%",
            bgcolor: "rgba(255,17,0,0.08)",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <HourglassTop sx={{ fontSize: "2.5rem", color: "#FF1100" }} />
        </Stack>

        {/* TITLE */}
        <Typography
          variant="h5"
          fontWeight={700}
          textAlign="center"
          color="#FF1100"
        >
          Approval Pending
        </Typography>

        {/* MESSAGE */}
        <Typography variant="body1" textAlign="center" color="text.secondary">
          Your shop details have been submitted successfully. Our admin team is
          reviewing your request.
        </Typography>

        <Typography variant="body2" textAlign="center" color="text.secondary">
          This usually takes a few hours. Once approved, you’ll get full access
          to the dashboard.
        </Typography>

        {/* ACTIONS */}
        <Stack width="100%" spacing={1.5} mt={1}>
          <MotionButton
            onClick={() => navigate("/")}
            whileHover={{ scale: 1.03 }}
            sx={{
              py: 1.3,
              borderRadius: 2,
              bgcolor: "#FF1100",
              color: "#fff",
              fontWeight: 600,
              "&:hover": { bgcolor: "#e00e00" },
            }}
          >
            Go to Home
          </MotionButton>

          <Button
            startIcon={<ContactSupport />}
            sx={{
              textTransform: "none",
              color: "#FF1100",
              fontWeight: 500,
            }}
          >
            Contact Support
          </Button>
        </Stack>

        {/* FOOTER NOTE */}
        <Typography
          variant="caption"
          textAlign="center"
          color="text.secondary"
          mt={1}
        >
          You’ll be automatically redirected once your account is approved.
        </Typography>
      </MotionStack>
    </Stack>
  );
};

export default ApprovalPending;
