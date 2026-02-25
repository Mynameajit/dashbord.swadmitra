import React, { useState } from "react";
import {
  Button,
  Stack,
  Typography,
  useTheme,
  CircularProgress,
} from "@mui/material";
import { AddPhotoAlternate, Restaurant } from "@mui/icons-material";
import { motion } from "framer-motion";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";

import FormInput from "../../components/common/FormInput";
import { createItem } from "../../features/owner/item/itemService";

/* ================= ANIMATION ================= */
const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay },
  }),
};

const MotionStack = motion(Stack);
const MotionButton = motion(Button);

/* ================= OPTIONS ================= */
const foodCategoryOptions = [
  { label: "Snacks", value: "Snacks" },
  { label: "Sandwich", value: "Sandwich" },
  { label: "Desserts", value: "Desserts" },
  { label: "Drinks", value: "Drinks" },
  { label: "Fast Food", value: "Fast-food" },
  { label: "Cake", value: "Cake" },
  { label: "Pasta", value: "Pasta" },
  { label: "Noodles", value: "noodles" },
  { label: "Pizza", value: "Pizza" },
  { label: "Burgers", value: "Burgers" },
];

/* ================= COMPONENT ================= */
const AddItem = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.item);

  /* ===== SINGLE FORM STATE ===== */
  const [form, setForm] = useState({
    name: "",
    originalPrice: "",
    description: "",
    stock: 1,
    discount: 0,
    foodType: "",
    category: "",
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  /* ================= HANDLERS ================= */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const resetForm = () => {
    setForm({
      name: "",
      originalPrice: "",
      description: "",
      stock: 1,
      discount: 0,
      foodType: "",
      category: "",
    });
    setImage(null);
    setImagePreview(null);
  };

  const handleCreateItem = async () => {
    try {
      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });

      if (image) {
        formData.append("image", image);
      }
      await dispatch(createItem(formData)).unwrap(); // 🔥 wait for success

      resetForm(); // ✅ clear form AFTER success
    } catch (error) {
      console.error("Create item failed:", error);
    }
  };

  /* ================= UI ================= */
  return (
    <Stack p={1} pb={5} minHeight="100vh" alignItems="center" justifyContent={{xs:"flex-start",md:"center"}}>
      <Stack width="100%" pb={3} borderRadius="16px">
        {/* ================= HEADER ================= */}
        <MotionStack
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          custom={0.2}
          alignItems="center"
          gap={1}
        >
          <Stack
            sx={{
              bgcolor: "rgba(255,17,0,0.1)",
              p: 1.2,
              borderRadius: "50%",
            }}
          >
            <Restaurant sx={{ fontSize: 42, color: "#FF1100" }} />
          </Stack>

          <Typography variant="h5" fontWeight={700} color="#FF1100">
            Create New Item
          </Typography>
        </MotionStack>

        {/* ================= FORM ================= */}
        <Stack gap={2} mt={3}>
          <Stack direction={{ xs: "column", md: "row" }} gap={2}>
            <FormInput
              name="name"
              label="Item Name"
              placeholder="Enter item name"
              value={form.name}
              onChange={handleChange}
            />

            <FormInput
              name="originalPrice"
              label="Price"
              type="number"
              placeholder="₹ Price"
              value={form.originalPrice}
              onChange={handleChange}
            />
          </Stack>

          <FormInput
            name="description"
            label="Description"
            placeholder="Item description"
            value={form.description}
            onChange={handleChange}
          />

          <Stack direction="row" gap={2}>
            <FormInput
              name="stock"
              label="Stock"
              type="number"
              value={form.stock}
              onChange={handleChange}
            />

            <FormInput
              name="discount"
              label="Discount"
              type="number"
              placeholder="0%"
              value={form.discount}
              onChange={handleChange}
            />
          </Stack>

          <Stack direction="row" gap={2}>
            <FormInput
              select
              name="foodType"
              label="Food Type"
              value={form.foodType}
              onChange={handleChange}
              options={[
                { label: "Veg", value: "Veg" },
                { label: "Non-Veg", value: "Non-Veg" },
              ]}
            />

            <FormInput
              select
              name="category"
              label="Category"
              value={form.category}
              onChange={handleChange}
              options={foodCategoryOptions}
            />
          </Stack>

          {/* ================= IMAGE ================= */}
          <Stack direction="row" gap={2} alignItems="center">
            <ImageUpload onChange={handleImage} />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="preview"
                style={{
                  width: 160,
                  height: 90,
                  borderRadius: 8,
                  objectFit: "cover",
                }}
              />
            )}
          </Stack>

          {/* ================= SUBMIT ================= */}
          <MotionButton
            onClick={handleCreateItem}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            custom={0.7}
            variant="contained"
            disabled={loading.create}
            sx={{
              bgcolor: "#FF1100",
              mt: 2,
              py: 1.2,
              fontWeight: 600,
            }}
          >
            {loading.create ? (
              <>
                <CircularProgress size={22} sx={{ color: "#fff", mr: 1 }} />
                Creating...
              </>
            ) : (
              "Create Item"
            )}
          </MotionButton>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default AddItem;

/* ================= IMAGE UPLOAD ================= */

const HiddenInput = styled("input")({
  display: "none",
});

const ImageUpload = ({ onChange }) => {
  return (
    <MotionButton
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      custom={0.6}
      component="label"
      sx={{
        border: "2px dashed #FF1100",
        color: "#FF1100",
        height: 90,
        width: 160,
        borderRadius: 2,
        flexDirection: "column",
        gap: 1,
      }}
    >
      <AddPhotoAlternate sx={{ fontSize: 32 }} />
      Upload Image
      <HiddenInput type="file" accept="image/*" onChange={onChange} />
    </MotionButton>
  );
};
