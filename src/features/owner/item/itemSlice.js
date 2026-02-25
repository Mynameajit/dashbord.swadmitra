import { createSlice } from "@reduxjs/toolkit";
import {
  createItem,
  getMyItems,
  updateItem,
  deleteItem,
} from "./itemService";

const itemSlice = createSlice({
  name: "items",
  initialState: {
    items: [],
    loading: {
      create: false,
      get: false,
      update: false,
      delete: false,
    },
    error: null,
    isFetched: false, // 🔥 IMPORTANT
  },

  reducers: {
    resetItems: (state) => {
      state.items = [];
      state.isFetched = false;
    },
  },

  extraReducers: (builder) => {
    builder

      /* ================= GET MY ITEMS ================= */
      .addCase(getMyItems.pending, (state) => {
        state.loading.get = true;
      })
      .addCase(getMyItems.fulfilled, (state, action) => {
        state.loading.get = false;
        state.items = action.payload.items;
        state.isFetched = true; // ✅ fetched once
      })
      .addCase(getMyItems.rejected, (state, action) => {
        state.loading.get = false;
        state.error = action.payload;
      })

      /* ================= CREATE ITEM ================= */
      .addCase(createItem.pending, (state) => {
        state.loading.create = true;
      })
      .addCase(createItem.fulfilled, (state, action) => {
        state.loading.create = false;
        console.log(action.payload);

        state.items.unshift(action.payload.items[0]);
      })
      .addCase(createItem.rejected, (state, action) => {
        state.loading.create = false;
        state.error = action.payload;
      })

      /* ================= UPDATE ITEM ================= */
      .addCase(updateItem.pending, (state) => {
        state.loading.update = true;
      })

      .addCase(updateItem.fulfilled, (state, action) => {
        state.loading.update = false;

        const updatedItem = action.payload.item;

        // Remove old item
        state.items = state.items.filter(
          (item) => item._id !== updatedItem._id
        );

        // Add updated item at top
        state.items.unshift(updatedItem);
      })

      .addCase(updateItem.rejected, (state, action) => {
        state.loading.update = false;
        state.error = action.payload;

      })

      /* ================= DELETE ITEM ================= */
      .addCase(deleteItem.pending, (state) => {
        state.loading.delete = true;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.loading.delete = false;

        state.items = state.items.filter(
          (item) => item._id !== action.payload.itemId
        );
        state.loading.update = false;

      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.loading.delete = false;
        state.error = action.payload;
      });
  },
});

export const { resetItems } = itemSlice.actions;
export default itemSlice.reducer;
