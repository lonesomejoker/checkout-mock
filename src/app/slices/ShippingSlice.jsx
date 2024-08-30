import { createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";

const initialState = {
  details: null, // Use null or an empty object instead of an array since only one entry is allowed
};

export const shippingData = createSlice({
  name: "shippingslice",
  initialState,
  reducers: {
    shippingInfo: (state, action) => {
      const shippingDetails = action.payload;
      state.details = shippingDetails; // Replace the existing details with the new one
      notification.success({
        message: <h1 className="font-poppins">Shipping details received</h1>,
      });
    },

    removeDetails: (state) => {
      state.details = null; // Set to null when removing details
    },
    
    clearDetails: (state) => {
      state.details = null; // Set to null when clearing details
    }
  }
});

export const { shippingInfo, removeDetails, clearDetails } = shippingData.actions;
export const shippingReducer = shippingData.reducer;
