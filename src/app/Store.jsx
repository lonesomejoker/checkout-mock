import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { cartReducer } from "./slices/CartSlice";
import CountryApi from "../services/CountryApi";
import { paymentDetailsReducer } from "./slices/PaymentSlice";
import { shippingReducer } from "./slices/ShippingSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  [CountryApi.reducerPath]:CountryApi.reducer,
  cartslice: cartReducer,
  paymentslice:paymentDetailsReducer,
  shippingslice:shippingReducer
});
const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false, // Disable the ImmutableStateInvariantMiddleware
    }).concat(CountryApi.middleware),
});
