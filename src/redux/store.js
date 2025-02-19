import { configureStore } from "@reduxjs/toolkit";
import filter from "./filter/slice";
import cart from "./cart/slice";
import product from "./product/slice";

export const store = configureStore({
  reducer: { filter, cart, product },
});
