import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/api";
import toast from "react-hot-toast";

export const createItem = createAsyncThunk(
  "item/createItem",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/item/create", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.success) {
        toast.success(data.message || "Item created");
      }

      return data;
    } catch (error) {
      console.log(error);
      const errorMessage =
        error.response?.data?.message || "Item create failed";
      toast.error(errorMessage);
      return rejectWithValue(error.response?.data);
    }
  }
);



export const getMyItems = createAsyncThunk(
  "item/getMyItems",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/item/my-items");

      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);


export const updateItem = createAsyncThunk(
  "item/updateItem",
  async ({ itemId, payload }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(
        `/item/update/${itemId}`,
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
console.log(data);


      if (data.success) {
        toast.success(data.message || "Item updated");
      }

      return data;
    } catch (error) {
      console.log(error);
      const errorMessage =
        error.response?.data?.message || "Item update failed";
      toast.error(errorMessage);
      return rejectWithValue(error.response?.data);
    }
  }
);


export const deleteItem = createAsyncThunk(
  "item/deleteItem",
  async (itemId, { rejectWithValue }) => {
    try {
      const { data } = await api.delete(`/item/delete/${itemId}`);

      if (data.success) {
        toast.success(data.message || "Item deleted");
      }

      return { itemId, data };
    } catch (error) {
      console.log(error);
      const errorMessage =
        error.response?.data?.message || "Item delete failed";
      toast.error(errorMessage);
      return rejectWithValue(error.response?.data);
    }
  }
);
