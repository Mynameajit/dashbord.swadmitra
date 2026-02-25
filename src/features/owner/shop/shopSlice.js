
import { createSlice } from "@reduxjs/toolkit";
import { createShop, getShop, toggleShopOpen, updateShop } from "./shopService";



const shopSlice = createSlice({
    name: "shop",

    initialState: {
        shop: null,
        loading: {
            create: false,
            update: false,
            get: false,
            delete: false,
            toggleShop: false
        },
        error: null,
        message: null,
        isShopCreated: false,

    },
    reducers: {
        clearMessage: (state) => {
            state.error = null;
            state.message = null;
        }
    },

    extraReducers: (builder) => {
        builder
            /* ===== FETCH USER ===== */
            .addCase(getShop.pending, (state) => {
                state.loading.get = true
            })
            .addCase(getShop.fulfilled, (state, action) => {
                state.loading.get = false;
                state.shop = action.payload.shop;
                state.isShopCreated = true;

            })
            .addCase(getShop.rejected, (state, action) => {
                state.loading.get = false;
                state.shop = null;
                state.error = action.payload?.message || "Register failed";
                state.isShopCreated = false;

            })


            /* ===== create shop ===== */
            .addCase(createShop.pending, (state) => {
                state.loading.create = true

            })
            .addCase(createShop.fulfilled, (state, action) => {
                state.loading.create = false;
                state.shop = action.payload.shop;
                state.isShopCreated = true; // 👈 IMPORTANT
            })
            .addCase(createShop.rejected, (state, action) => {
                state.loading.create = false;
                state.shop = null;
                state.error = action.payload?.message || "Register failed";
                state.isShopCreated = false;
            })
            /* ===== Update shop ===== */
            .addCase(updateShop.pending, (state) => {
                state.loading.update = true

            })
            .addCase(updateShop.fulfilled, (state, action) => {
                state.loading.update = false;
                state.shop = action.payload.shop;
            })
            .addCase(updateShop.rejected, (state, action) => {
                state.loading.update = false;
                state.shop = null;
                state.error = action.payload?.message || "Register failed";
            })

            /* ===== toggleShopOpen shop ===== */
            .addCase(toggleShopOpen.pending, (state) => {
                state.loading.toggleShop = true

            })
            .addCase(toggleShopOpen.fulfilled, (state, action) => {
                state.loading.toggleShop = false;
                state.shop = action.payload.shop;

            })
            .addCase(toggleShopOpen.rejected, (state, action) => {
                state.loading.toggleShop = false;
                state.error = action.payload?.message || "Register failed";
            })



    }


})
export default shopSlice.reducer