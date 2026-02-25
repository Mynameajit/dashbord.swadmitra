import {
  Box,
  Button,
  Stack,
  Typography,
  Paper,
} from "@mui/material";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import AuthInput from "../../components/auth/AuthInput";
import BackgroundCircles from "../../components/ui/BackgroundCircles";

const DeliveryRegister = () => {
  return (
    <Stack
      height="100vh"
      width="100%"
      alignItems="center"
      justifyContent="center"
      position="relative"
      zIndex={1}
    >
      <BackgroundCircles />

      <Stack
        direction={{ xs: "column", md: "row" }}
        sx={{
          width: "100%",
          maxWidth: "1100px",
          p: 2,
            position:"relative",
          zIndex:100

        }}
      >
        {/* LEFT */}
        <Box flex={1} px={{ xs: 3, md: 6 }} display="flex" alignItems="center">
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography variant="h4" fontWeight={700} color="#ff3b30" mb={2}>
              Become Delivery Partner
            </Typography>

            <Typography color="text.secondary" mb={3}>
              Start delivering and earning with SwadMitra.
            </Typography>

            <Stack spacing={1.5}>
              <Typography>🛵 Flexible delivery</Typography>
              <Typography>💰 Weekly earnings</Typography>
              <Typography>📍 Live order tracking</Typography>
              <Typography>📱 Easy dashboard</Typography>
            </Stack>
          </motion.div>
        </Box>

        {/* RIGHT */}
        <Stack flex={1} alignItems="center" justifyContent="center">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Paper elevation={0} sx={{ p: 4, width: 420, background: "transparent" }}>
              <Typography variant="h5" fontWeight={600} mb={1}>
                Delivery Registration
              </Typography>
              <Typography fontSize={14} color="text.secondary" mb={3}>
                Join as a delivery partner
              </Typography>

              <Stack spacing={2}>
                <AuthInput placeholder="Full Name" />
                <AuthInput placeholder="Phone Number" />
                <AuthInput placeholder="Email" type="email" />
                <AuthInput placeholder="Password" type="password" />
                <AuthInput placeholder="Confirm Password" type="password" />

                <Button
                  component={motion.button}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  fullWidth
                  sx={{
                    mt: 1,
                    bgcolor: "#ff3b30",
                    color: "#fff",
                    py: 1.2,
                    fontWeight: 500,
                    borderRadius: "10px",
                    textTransform: "none",
                    boxShadow: "0 6px 14px rgba(255,59,48,0.35)",
                    "&:hover": {
                      bgcolor: "#ff4d4d",
                    },
                  }}
                >
                  Register as Delivery Partner
                </Button>

                <Typography fontSize={13} textAlign="center">
                  Already registered?{" "}
                  <NavLink to="/login" style={{ color: "#ff3b30" }}>
                    Login
                  </NavLink>
                </Typography>
              </Stack>
            </Paper>
          </motion.div>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default DeliveryRegister;
