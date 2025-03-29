import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import cartSlice from "./cartSlice";
import filterSlice from "./filterSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    products: productsReducer,
    filter: filterSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
