import { createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";

const initialState = {
  details: null, 
};

export const shippingData = createSlice({
  name: "shippingslice",
  initialState,
  reducers: {
    shippingInfo: (state, action) => {
      const shippingDetails = action.payload;
      state.details = shippingDetails; 
      notification.success({
        message: <h1 className="font-poppins">Shipping details received</h1>,
      });
    },
    clearDetails: (state) => {
      state.details = null; 
    },
    updateDetails: (state, action) => {
      const updatedDetails = action.payload;
      // Merge the existing details with the updated details
      state.details = { ...state.details, ...updatedDetails }; 
      notification.success({
        message: <h1 className="font-poppins">Shipping details updated</h1>,
      });
    },
    
  }
});

export const { shippingInfo, removeDetails, clearDetails,updateDetails } = shippingData.actions;
export const shippingReducer = shippingData.reducer;
