import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";
import toast from "react-hot-toast";


export const registerOwner = createAsyncThunk("Owner/registerOwner",
    async (payload, { rejectWithValue }) => {
        try {
            const { data } = await api.post("/dashboard/auth/register-owner", payload)
            console.log(data);

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

export const loginOwner = createAsyncThunk("Owner/loginOwner",
    async (payload, { rejectWithValue }) => {
        try {
            const { data } = await api.post("/dashboard/auth/login-owner", payload)
            console.log(data);

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


export const fetchOwner = createAsyncThunk("Owner/fetchOwner",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await api.get("/dashboard/auth/me")

            return data
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response?.data);

        }
    })

export const logoutOwner = createAsyncThunk("Owner/logoutOwner",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await api.get("/dashboard/auth/logout")
            console.log(data);
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
            toast.error(errorMessage)
            return rejectWithValue(error.response?.data);

        }
    })


