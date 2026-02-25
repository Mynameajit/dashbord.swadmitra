import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import colors from "../../theme/color";
import AuthInput from "../../components/auth/AuthInput";
import { useNavigate, NavLink, Link } from "react-router-dom";
import BackgroundCircles from "../../components/ui/BackgroundCircles";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginOwner } from "../../features/auth/authService";
import { getRedirectPath } from "../../routes/authRedirect";
import { getShop } from "../../features/owner/shop/shopService";

const DashboardLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated, loading } = useSelector((state) => state.user);
  const { shop, isShopCreated } = useSelector((state) => state.shop);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOwnerLogin = async () => {
    dispatch(loginOwner(formData));
  };

  return (
    <Stack
      height="100vh"
      width={"100%"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <BackgroundCircles />

      <Stack
        direction={{ xs: "column", md: "row" }}
        sx={{
          width: "100%",
          maxWidth: "1100px",
          p: 2,
        }}
      >
        {/* ================= LEFT CONTENT ================= */}
        <Box flex={1} px={{ xs: 3, md: 6 }} display="flex" alignItems="center">
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h4"
              sx={{ color: "#ff1100" }}
              fontWeight={700}
              mb={2}
            >
              SwadMitra Dashboard
            </Typography>

            <Typography mb={3}>
              One place to manage your restaurant, orders and delivery partners
              professionally.
            </Typography>

            {/* STEPS */}
            <Stack spacing={2}>
              <Typography>✅ Login to your dashboard</Typography>
              <Typography>✅ Manage orders & menus</Typography>
              <Typography>✅ Track delivery in real-time</Typography>
              <Typography>✅ Grow your business faster</Typography>
            </Stack>

            <Box mt={4}>
              <Typography fontSize={14}>📧 support@swadmitra.com</Typography>
              <Typography fontSize={14}>📞 +91 9XXXX XXXXX</Typography>
            </Box>
          </motion.div>
        </Box>

        {/* ================= RIGHT FORM ================= */}
        <Stack
          flex={1}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <motion.div
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Paper
              elevation={0}
              sx={{
                p: 4,
                width: 420,
                background: "transparent",
              }}
            >
              <Typography
                variant="h5"
                sx={{ color: "#FF1100" }}
                fontWeight={700}
                mb={1}
              >
                Login to Dashboard
              </Typography>
              <Typography mb={3} color="text.secondary">
                Enter your credentials to continue
              </Typography>

              <Stack spacing={2}>
                <AuthInput
                  name="email"
                  placeholder="Email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <AuthInput
                  name="password"
                  placeholder="Password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                />

                <Box textAlign="right">
                  <Typography
                    sx={{
                      color: "#FF1100",
                      ":hover": {
                        cursor: "pointer",
                      },
                    }}
                    fontSize={14}
                  >
                    Forgot password?
                  </Typography>
                </Box>

                <Button
                  disabled={loading.login}
                  onClick={handleOwnerLogin}
                  component={motion.button}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  sx={{
                    mt: 2,
                    bgcolor: "#ff3b30",
                    color: "#fff",
                    py: 1.2,
                    fontSize: 15,
                    fontWeight: 500,
                    borderRadius: "10px",
                    textTransform: "none",
                    boxShadow: "0 6px 14px rgba(255,59,48,0.35)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      bgcolor: "#ff4d4d",
                      boxShadow: "0 10px 22px rgba(255,59,48,0.45)",
                    },
                  }}
                  fullWidth
                >
                  {loading.login ? (
                    <>
                      <CircularProgress
                        size={22}
                        sx={{ color: "#fff", mr: 1 }}
                      />
                      Submitting...
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>

                <Box my={3} display="flex" alignItems="center" gap={1}>
                  <Box flex={1} height="1px" bgcolor="divider" />
                  <Typography fontSize={12} color="text.secondary">
                    New here?
                  </Typography>
                  <Box flex={1} height="1px" bgcolor="divider" />
                </Box>

                <Box mt={3}>
                  <Stack spacing={1.5}>
                    <NavLink
                      to="/register-owner"
                      style={{ textDecoration: "none" }}
                    >
                      <Box
                        sx={{
                          px: 2.5,
                          py: 1.2,
                          borderRadius: 2,
                          border: "1px solid rgba(255,17,0,0.4)",
                          color: "#ff3b30",
                          fontSize: 14,
                          fontWeight: 500,
                          textAlign: "center",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            backgroundColor: "rgba(255,17,0,0.08)",
                            borderColor: "#ff3b30",
                            boxShadow: "0 0 8px rgba(255,17,0,0.25)",
                          },
                        }}
                      >
                        🍽️ Register as Restaurant Owner
                      </Box>
                    </NavLink>

                    <NavLink
                      to="/register-delivery"
                      style={{ textDecoration: "none" }}
                    >
                      <Box
                        sx={{
                          px: 2.5,
                          py: 1.2,
                          borderRadius: 2,
                          border: "1px solid rgba(255,17,0,0.35)",
                          color: "#ff3b30",
                          fontSize: 14,
                          fontWeight: 500,
                          textAlign: "center",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            backgroundColor: "rgba(255,17,0,0.08)",
                            borderColor: "#ff3b30",
                            boxShadow: "0 0 8px rgba(255,17,0,0.25)",
                          },
                        }}
                      >
                        🛵 Register as Delivery Partner
                      </Box>
                    </NavLink>
                  </Stack>
                </Box>
              </Stack>
            </Paper>
          </motion.div>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default DashboardLogin;
