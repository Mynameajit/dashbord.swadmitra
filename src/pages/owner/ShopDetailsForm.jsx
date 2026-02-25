import React, { useState } from "react";
import {
  Stack,
  Typography,
  Button,
  CircularProgress,
  useTheme,
} from "@mui/material";
import { Store, AddPhotoAlternate } from "@mui/icons-material";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "../../components/common/FormInput";
import BackgroundCircles from "../../components/ui/BackgroundCircles";
import { createShop } from "../../features/owner/shop/shopService";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import { TimePicker } from "@mui/x-date-pickers/TimePicker";


/* ================= ANIMATION ================= */
const containerVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay },
  }),
};

const MotionStack = motion(Stack);
const MotionButton = motion(Button);

/* ================= SHOP CATEGORY OPTIONS ================= */
const shopCategoryOptions = [
  { label: "Restaurant", value: "restaurant" },
  { label: "Grocery", value: "grocery" },
  { label: "Bakery", value: "bakery" },
  { label: "Sweet Shop", value: "sweet" },
  { label: "Kirana Store", value: "kirana" },
  { label: "Pharmacy", value: "pharmacy" },
  { label: "Other", value: "other" },
];

const ShopDetailsForm = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.shop);

  const { isShopCreated } = useSelector((state) => state.shop);

  useEffect(() => {
    if (isShopCreated) {
      navigate("/owner/approval-pending");
    }
  }, [isShopCreated, navigate]);

  /* ================= FORM STATE ================= */
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    city: "",
    state: "",
    pinCode: "",
    address: "",
    category: "restaurant",
    openingTime: "",
    closingTime: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    const {
      name,
      mobile,
      city,
      state,
      pinCode,
      address,
      category,
      openingTime,
      closingTime,
    } = form;

    // ================= BASIC VALIDATION =================
    if (
      !image ||
      !name ||
      !mobile ||
      !city ||
      !state ||
      !pinCode ||
      !address ||
      !category ||
      !openingTime ||
      !closingTime
    ) {
      return toast.error("Please fill all required fields");
    }

    // ================= TIME VALIDATION =================
    if (dayjs(closingTime, "hh:mm A").isBefore(dayjs(openingTime, "hh:mm A"))) {
      return toast.error("Closing time must be later than opening time");
    }

    try {
      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });

      formData.append("image", image);

      await dispatch(createShop(formData)).unwrap();

      toast.success("Shop submitted successfully");
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    }
  };

  return (
    <Stack
      minHeight="100vh"
      py={{ xs: 2, md: 6 }}
      alignItems="center"
      position="relative"
    >
      <BackgroundCircles />

      <MotionStack
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        custom={0.1}
        maxWidth={900}
        width="100%"
        borderRadius={3}
        p={{ xs: 2, md: 4 }}
        pb={{ xs: "5rem", md: 3 }}
        sx={{
          background:
            theme.palette.mode === "dark" ? "rgba(255,255,255,0.03)" : "#fff",
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 0 10px rgba(255,255,255,0.06)"
              : "0 10px 30px rgba(0,0,0,0.08)",
          zIndex: 2,
        }}
      >
        {/* ================= HEADER ================= */}
        <MotionStack
          variants={containerVariants}
          custom={0.2}
          alignItems="center"
          spacing={1}
        >
          <Stack
            sx={{
              bgcolor: "rgba(255,17,0,0.06)",
              height: "4.5rem",
              width: "4.5rem",
              borderRadius: "50%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Store sx={{ fontSize: "2.8rem", color: "#FF1100" }} />
          </Stack>

          <Typography variant="h5" fontWeight={700} color="#FF1100">
            Shop Details
          </Typography>

          <Typography variant="body2" color="text.secondary" textAlign="center">
            Complete your shop profile to access dashboard features
          </Typography>
        </MotionStack>

        {/* ================= FORM ================= */}
        <Stack spacing={3} mt={4}>
          {/* BASIC INFO */}
          <Stack direction={{ xs: "column", md: "row" }} gap={2}>
            <FormInput
              label="Shop Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter shop name"
              width="100%"
            />
            <FormInput
              label="Mobile Number"
              name="mobile"
              isMobileNo
              value={form.mobile}
              onChange={handleChange}
              placeholder="Enter mobile number"
              width="100%"
            />
          </Stack>

          {/* LOCATION + CATEGORY */}
          <Stack direction={{ xs: "column", md: "row" }} gap={2}>
            <FormInput
              select
              label="Category"
              name="category"
              value={form.category}
              onChange={handleChange}
              options={shopCategoryOptions}
              width="100%"
            />
            <FormInput
              label="City"
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="City"
              width="100%"
            />
            <FormInput
              label="State"
              name="state"
              value={form.state}
              onChange={handleChange}
              placeholder="State"
              width="100%"
            />
          </Stack>

          {/* ADDRESS */}
          <Stack direction={{ xs: "column", md: "row" }} gap={2}>
            <FormInput
              label="pinCode"
              name="pinCode"
              value={form.pinCode}
              onChange={handleChange}
              placeholder="pinCode"
              width={{ xs: "100%", md: "50%" }}
            />
            <FormInput
              label="Full Address"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Enter full address"
              width="100%"
            />
          </Stack>

          <Stack width={"100%"} direction={{ xs: "column", md: "row" }} gap={2} alignItems={"center"}>
            {/* ================= SHOP TIMING ================= */}
            <Stack
              width={"100%"}
              direction={{ xs: "column", md: "column" }}
              gap={3}
            >
              <TimePicker
                label="Opening Time"
                value={
                  form.openingTime ? dayjs(form.openingTime, "hh:mm A") : null
                }
                onChange={(newValue) =>
                  setForm((prev) => ({
                    ...prev,
                    openingTime: newValue
                      ? dayjs(newValue).format("hh:mm A")
                      : "",
                  }))
                }
                format="hh:mm A"
                slotProps={{
                  textField: { fullWidth: true },
                }}
              />

              <TimePicker
                label="Closing Time"
                value={
                  form.closingTime ? dayjs(form.closingTime, "hh:mm A") : null
                }
                onChange={(newValue) =>
                  setForm((prev) => ({
                    ...prev,
                    closingTime: newValue
                      ? dayjs(newValue).format("hh:mm A")
                      : "",
                  }))
                }
                format="hh:mm A"
                slotProps={{
                  textField: { fullWidth: true },
                }}
              />
            </Stack>

            {/* IMAGE UPLOAD */}
            <Stack spacing={1}>
              <Typography fontWeight={600}>Shop Image</Typography>

              <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={3}
                alignItems="center"
              >
                {/* Upload Box */}
                <Button
                  component="label"
                  sx={{
                    height: "9rem",
                    width: "16rem",
                    border: "2px dashed rgba(255,17,0,0.6)",
                    color: "#FF1100",
                    bgcolor: "rgba(255,17,0,0.04)",
                    borderRadius: "12px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    textTransform: "none",
                    "&:hover": {
                      bgcolor: "rgba(255,17,0,0.08)",
                    },
                  }}
                >
                  <AddPhotoAlternate sx={{ fontSize: "2.8rem" }} />
                  <Typography variant="body2">Upload Image</Typography>
                  <input
                    hidden
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </Button>

                {/* Preview Box */}
                <Stack
                  sx={{
                    height: "9rem",
                    width: "16rem",
                    borderRadius: "12px",
                    border: "1px solid rgba(0,0,0,0.1)",
                    overflow: "hidden",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "rgba(0,0,0,0.02)",
                  }}
                >
                  {preview ? (
                    <img
                      src={preview}
                      alt="preview"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <Typography variant="caption" color="text.secondary">
                      Image Preview
                    </Typography>
                  )}
                </Stack>
              </Stack>
            </Stack>
          </Stack>

          {/* SUBMIT */}
          <MotionButton
            onClick={handleSubmit}
            disabled={loading.create}
            variants={containerVariants}
            custom={0.8}
            sx={{
              mt: 5,
              py: 1.5,
              borderRadius: 2,
              bgcolor: "#FF1100",
              color: "#fff",
              fontWeight: 600,
              fontSize: "16px",
              "&:hover": { bgcolor: "#e00e00" },
              "&:disabled": {
                bgcolor: "rgba(255,17,0,0.4)",
                color: "#fff",
              },
            }}
          >
            {loading.create ? (
              <>
                <CircularProgress size={22} sx={{ color: "#fff", mr: 1 }} />
                Submitting...
              </>
            ) : (
              "Submit for Approval"
            )}
          </MotionButton>
        </Stack>
      </MotionStack>
    </Stack>
  );
};

export default ShopDetailsForm;
