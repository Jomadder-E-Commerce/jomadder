
import { frontendApi, backendApi } from "@/components/Redux/api/baseApi";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import counterSlice from "@/components/Redux/features/AllSlice/counterSlice"
import authSlice from "@/components/Redux/features/AllSlice/authSlice"
import checkoutSlice from "@/components/Redux/features/AllSlice/checkoutSlice"
import searchByImageProductsSlice from "@/components/Redux/features/AllSlice/searchByImageSlice";

export const store = configureStore({
  reducer: {
    [frontendApi.reducerPath]: frontendApi.reducer,
    [backendApi.reducerPath]: backendApi.reducer,
    counter: counterSlice,
    auth: authSlice,
    checkout: checkoutSlice,
    searchByImageProducts: searchByImageProductsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(frontendApi.middleware).concat(backendApi.middleware),
});

setupListeners(store.dispatch); 
