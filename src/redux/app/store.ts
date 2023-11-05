import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../features/cart/cartSlice";
import adminSlice from "../features/admin/adminSlice";

const store = configureStore({
    reducer: {
        cart: cartSlice,
        admin: adminSlice
    }
});
export default store;