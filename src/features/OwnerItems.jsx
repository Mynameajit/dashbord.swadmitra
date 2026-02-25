import React, { useEffect, useState } from "react";
import { Grid, Stack, Typography, Button, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import {
  getMyItems,
  deleteItem,
  updateItem,
} from "../features/owner/item/itemService";

import DashboardLoader from "../components/loaders/DashboardLoader";
import EditItemDialog from "../components/owner/EditItemDialog";
import OwnerItemCard from "../components/owner/OwnerItemCard";
import { Link } from "react-router-dom";
import OwnerItemSkeleton from "../components/owner/OwnerItemSkeleton";

const OwnerItems = () => {
  const dispatch = useDispatch();

  const { items, loading, isFetched } = useSelector((state) => state.item);

  const [editItem, setEditItem] = useState(null);
  const [selectId, setSelectId] = useState(null);

  /* ================= FETCH ONLY ONCE ================= */
  useEffect(() => {
    if (!isFetched) {
      dispatch(getMyItems());
    }
  }, [isFetched, dispatch]);

  /* ================= HANDLERS ================= */

  const handleDelete = (itemId) => {
    setSelectId(itemId);
    dispatch(deleteItem(itemId));
  };

  const handleEditOpen = (item) => {
    setEditItem(item);
  };

  const handleEditClose = () => {
    setEditItem(null);
  };

  const handleUpdate = async (itemId, formData) => {
    await dispatch(updateItem({ itemId, payload: formData })).unwrap();
    setEditItem(null);
  };

  /* ================= LOADING ================= */
  if (loading.get) {
    return  <OwnerItemSkeleton />
  }

  return (
    <Stack p={2}>
      {/* ================= HEADER ================= */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography fontSize="1.5rem" fontWeight={700}>
          My Items
        </Typography>

        <Button
          component={Link}
          to="/owner/add-item"
          variant="contained"
          sx={{
            bgcolor: "#FF1100",
            textTransform: "none",
            fontWeight: 600,
            "&:hover": { bgcolor: "#d90900" },
          }}
        >
          + Add Item
        </Button>
      </Stack>

      {/* ================= EMPTY STATE ================= */}
      {items.length === 0 ? (
        <Stack alignItems="center" mt={8}>
          <Typography fontSize="1.1rem" fontWeight={600}>
            No items added yet
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            Start by adding your first food item 🍔
          </Typography>
        </Stack>
      ) : (
        <Grid container spacing={3}>
          {items.map((item, i) => (
            <Grid item xs={12} sm={6} lg={3} key={item?._id}>
              <OwnerItemCard
                item={item}
                i={i}
                deleteLoading={loading.delete && selectId === item._id}
                onEdit={() => handleEditOpen(item)}
                onDelete={() => handleDelete(item._id)}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {/* ================= EDIT DIALOG ================= */}
      {editItem && (
        <EditItemDialog
          open={Boolean(editItem)}
          item={editItem}
          loading={loading.update}
          onClose={handleEditClose}
          onSubmit={handleUpdate}
        />
      )}
    </Stack>
  );
};

export default OwnerItems;
