import React, { useEffect, useState } from "react";
import {
  Dialog,
  Stack,
  Button,
  Typography,
  useTheme,
  CircularProgress,
} from "@mui/material";
import { Restaurant, AddPhotoAlternate } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import FormInput from "../common/FormInput";
import { useSelector } from "react-redux";

const MotionStack = motion(Stack);
const MotionButton = motion(Button);

/* ================= IMAGE INPUT ================= */
const HiddenInput = styled("input")({
  display: "none",
});

const ImageUpload = ({ onChange }) => (
  <MotionButton
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
    <AddPhotoAlternate sx={{ fontSize: 30 }} />
    Change Image
    <HiddenInput type="file" accept="image/*" onChange={onChange} />
  </MotionButton>
);

/* ================= MAIN DIALOG ================= */

const EditItemDialog = ({ open, onClose, item, onSubmit }) => {
  const theme = useTheme();
  const { loading } = useSelector((state) => state.item);
  const [form, setForm] = useState({});
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  /* ===== Set old data ===== */
  useEffect(() => {
    if (item) {
      setForm({
        name: item.name || "",
        originalPrice: item.originalPrice || "",
        description: item.description || "",
        stock: item.stock || 1,
        discount: item.discount || 0,
        foodType: item.foodType || "",
        category: item.category || "",
      });
      setPreview(item.image);
    }
  }, [item]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = () => {
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    if (image) formData.append("image", image);

    onSubmit(item._id, formData);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: {
          background:
            theme.palette.mode === "dark"
              ? "rgba(0,0,0,0.6)"
              : "rgba(255,255,255,0.6)",
          backdropFilter: "blur(10px)",
          borderRadius: 3,
          p: 2,
        },
      }}
      BackdropProps={{
        sx: {
          backdropFilter: "blur(8px)",
          backgroundColor: "rgba(0,0,0,0.4)",
        },
      }}
    >
      <Stack gap={3}>
        {/* ===== HEADER ===== */}
        <Stack alignItems="center" gap={1}>
          <Stack
            sx={{
              bgcolor: "rgba(255,17,0,0.1)",
              p: 1.2,
              borderRadius: "50%",
            }}
          >
            <Restaurant sx={{ fontSize: 38, color: "#FF1100" }} />
          </Stack>

          <Typography variant="h5" fontWeight={700} color="#FF1100">
            Edit Item
          </Typography>
        </Stack>

        {/* ===== FORM ===== */}
        <Stack gap={2}>
          <Stack direction={{ xs: "column", md: "row" }} gap={2}>
            <FormInput
              name="name"
              label="Item Name"
              value={form.name}
              onChange={handleChange}
            />
            <FormInput
              name="originalPrice"
              label="Price"
              type="number"
              value={form.originalPrice}
              onChange={handleChange}
            />
          </Stack>

          <FormInput
            name="description"
            label="Description"
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
              label="Discount %"
              type="number"
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
              options={[
                { label: "Snacks", value: "Snacks" },
                { label: "Fast Food", value: "Fast Food" },
                { label: "Pizza", value: "Pizza" },
                { label: "Burger", value: "Burger" },
              ]}
            />
          </Stack>

          {/* ===== IMAGE ===== */}
          <Stack direction="row" gap={2} alignItems="center">
            <ImageUpload onChange={handleImage} />
            {preview && (
              <img
                src={preview}
                alt="preview"
                style={{
                  width: 160,
                  height: 90,
                  objectFit: "cover",
                  borderRadius: 8,
                }}
              />
            )}
          </Stack>

          {/* ===== ACTIONS ===== */}
          <Stack direction="row" justifyContent="flex-end" gap={2}>
            <Button onClick={onClose} variant="outlined">
              Cancel
            </Button>

            <Button
              onClick={handleUpdate}
              variant="contained"
              sx={{ bgcolor: "#FF1100" }}
            >
              {loading.update ? (
                <>
                  <CircularProgress size={20} sx={{ color: "#fff", mr: 1 }} />
                  Updating...
                </>
              ) : (
                "Update Item"
              )}
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default EditItemDialog;
