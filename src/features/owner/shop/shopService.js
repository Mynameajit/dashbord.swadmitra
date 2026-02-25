import { createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../../utils/api"
import toast from "react-hot-toast"


export const createShop = createAsyncThunk("shop/createShop",
    async (payload, { rejectWithValue }) => {
        try {
            const { data } = await api.post("/shop/create", payload, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            if (data.success) {
                toast.success(data?.message)
            }
            else {
                toast.error(data?.response?.data?.message)
            }
            return data
        } catch (error) {
            console.log(error);
            const errorMessage = error.response?.data?.message || "Something went wrong";
            toast.error(errorMessage);
            return rejectWithValue(error.response?.data);

        }
    })




export const getShop = createAsyncThunk("shop/getShop",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await api.get("/shop/get")
            console.log(data);

            return data
        } catch (error) {
            console.log(error).response?.data;
            return rejectWithValue(error.response?.data);

        }
    })

export const updateShop = createAsyncThunk("shop/update",
    async ({ shopId }, { rejectWithValue }) => {
        try {
            const { data } = await api.put(`/shop/update/${shopId}`)

            return data
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response?.data);

        }
    })

export const toggleShopOpen = createAsyncThunk("shop/toggleShopOpen",
    async ({ shopId }, { rejectWithValue }) => {
        try {
            const { data } = await api.patch(`/shop/toggle/${shopId}`)
            console.log(data);

            return data
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response?.data);

        }
    })



