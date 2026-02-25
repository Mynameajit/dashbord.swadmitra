import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import api from "../../../utils/api";

/* ===============================
   FETCH OWNER ORDERS
================================ */
export const fetchOwnerOrders = createAsyncThunk(
  "ownerOrder/fetchOwnerOrders",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/order/owner");

      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);


/* ===============================
   UPDATE SHOP ORDER STATUS
================================ */
export const updateOwnerOrderStatus = createAsyncThunk(
  "ownerOrder/updateStatus",
  async ({ orderId, shopOrderId, status }, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(
        `/order/owner/update-status/${orderId}/${shopOrderId}`,
        { status }
      );

      if (data.success) toast.success(data.message);

      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Status update failed");
      return rejectWithValue(error.response?.data);
    }
  }
);
