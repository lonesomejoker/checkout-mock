import { createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";
const initialState = {
  paydetails: null,
};

export const paymentSlice = createSlice({
  name: "paymentslice",
  initialState,
  reducers: {
    paymentData: (state, action) => {
      const paymentInfo = action.payload;
      state.paydetails = paymentInfo; 
      notification.success({
        message: <h1 className="font-poppins">Payment details received</h1>,
      });
  
    },
         
    clearPayDetails:(state,action)=>{
     state.paydetails=null;
    }
  }
});

export const { paymentData,clearPayDetails } =paymentSlice.actions;
export const paymentDetailsReducer= paymentSlice.reducer;