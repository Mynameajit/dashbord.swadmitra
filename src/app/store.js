import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import shopSlice from "../features/owner/shop/shopSlice";
import itemSlice from "../features/owner/item/itemSlice";
import orderSlice from "../features/owner/order/orderSlice";



export const store = configureStore({
    reducer: {
        user: authSlice,
        shop: shopSlice,
        item: itemSlice,
        order: orderSlice,

    }
})