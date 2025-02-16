
import { baseApi,frontendApi,backendApi } from "@/components/Redux/api/baseApi";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import counterSlice from "@/components/Redux/features/AllSlice/counterSlice"
import authSlice from "@/components/Redux/features/AllSlice/authSlice"
import checkoutSlice from "@/components/Redux/features/AllSlice/checkoutSlice"

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer, 
    [frontendApi.reducerPath]: frontendApi.reducer, 
    [backendApi.reducerPath]: backendApi.reducer, 
    counter: counterSlice,
    auth: authSlice,
    checkout: checkoutSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware).concat(frontendApi.middleware).concat(backendApi.middleware), 
});

setupListeners(store.dispatch); 
