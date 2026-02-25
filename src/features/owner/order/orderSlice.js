import { createSlice } from "@reduxjs/toolkit";
import { fetchOwnerOrders, updateOwnerOrderStatus } from "./orderService";


const ownerOrderSlice = createSlice({
  name: "ownerOrder",
  initialState: {
    orders: [],
    loading: {
      fetch: false,
      update: false,
    },
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder

      /* ================= FETCH ================= */
      .addCase(fetchOwnerOrders.pending, (state) => {
        state.loading.fetch = true;
      })
      .addCase(fetchOwnerOrders.fulfilled, (state, action) => {
        state.loading.fetch = false;
        state.orders = action.payload.orders;
          state.isFetched = true; 
      })
      .addCase(fetchOwnerOrders.rejected, (state, action) => {
        state.loading.fetch = false;
        state.error = action.payload?.message;
      })

      /* ================= UPDATE STATUS ================= */
      .addCase(updateOwnerOrderStatus.pending, (state) => {
        state.loading.update = true;
      })
      .addCase(updateOwnerOrderStatus.fulfilled, (state, action) => {
        state.loading.update = false;

        const { orderId, shopOrderId, status } = action.payload.updatedOrders;

        const order = state.orders.find((o) => o._id === orderId);

        if (order) {
          const shopOrder = order.shopOrders.find(
            (so) => so._id === shopOrderId
          );

          if (shopOrder) {
            shopOrder.status = status;
          }
        }
      })

      .addCase(updateOwnerOrderStatus.rejected, (state, action) => {
        state.loading.update = false;
        state.error = action.payload?.message;
      });
  },
});

export default ownerOrderSlice.reducer;
