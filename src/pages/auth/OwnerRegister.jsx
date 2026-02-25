import { Box, Button, Stack, Typography, Paper } from "@mui/material";
import { motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import AuthInput from "../../components/auth/AuthInput";
import BackgroundCircles from "../../components/ui/BackgroundCircles";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerOwner } from "../../features/auth/authService";
import toast from "react-hot-toast";
import { getRedirectPath } from "../../routes/authRedirect";
import { getShop } from "../../features/owner/shop/shopService";

const OwnerRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated, loading } = useSelector((state) => state.user);

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

  const handleOwnerRegister = async () => {
    if (formData.password !== formData.confirmPassword) {
      return toast.error("Password and Confirm Password do not match");
    }

    const { confirmPassword, ...payload } = formData;
    dispatch(registerOwner(payload));
  };

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
          position: "relative",
          zIndex: 100,
        }}
      >
        {/* LEFT */}
        <Box
          flex={1}
          px={{ xs: 3, md: 6 }}
          display={{ xs: "none", md: "flex" }}
          alignItems="center"
        >
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography variant="h4" fontWeight={700} color="#ff3b30" mb={2}>
              Register Restaurant
            </Typography>

            <Typography color="text.secondary" mb={3}>
              Create your owner account and manage orders professionally.
            </Typography>

            <Stack spacing={1.5}>
              <Typography>🍽️ Add your restaurant</Typography>
              <Typography>📦 Manage orders</Typography>
              <Typography>🚚 Track delivery</Typography>
              <Typography>📊 Grow your business</Typography>
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
            <Paper
              elevation={0}
              sx={{ p: 4, width: 420, background: "transparent" }}
            >
              <Typography variant="h5" fontWeight={600} mb={1}>
                Owner Registration
              </Typography>
              <Typography fontSize={14} color="text.secondary" mb={3}>
                Fill details to create your account
              </Typography>

              <Stack spacing={2}>
                <AuthInput
                  name={"fullName"}
                  onChange={handleChange}
                  value={formData.fullName}
                  placeholder="Owner Name"
                />
                <AuthInput
                  name={"email"}
                  onChange={handleChange}
                  value={formData.email}
                  placeholder="Email"
                  type="email"
                />

                <AuthInput
                  name={"mobile"}
                  onChange={handleChange}
                  value={formData.mobile}
                  placeholder="Phone Number"
                />
                <AuthInput
                  name={"password"}
                  onChange={handleChange}
                  value={formData.password}
                  placeholder="Password"
                  type="password"
                />
                <AuthInput
                  name={"confirmPassword"}
                  onChange={handleChange}
                  value={formData.confirmPassword}
                  placeholder="Confirm Password"
                  type="password"
                />

                <Button
                  onClick={handleOwnerRegister}
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
                  {loading.register ? (
                    <>
                      <CircularProgress size={20} sx={{ color: "#fff" }} />
                      Creating...
                    </>
                  ) : (
                    "Create Owner Account"
                  )}
                </Button>

                <Typography fontSize={13} textAlign="center">
                  Already have an account?{" "}
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

export default OwnerRegister;
