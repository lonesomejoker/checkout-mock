import { createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";
const initialState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cartslice",
  initialState,
  reducers: {
    cartData: (state, action) => {
      const newItem = action.payload;
      // Check if an item with the same id already exists in the cart
      const existingItemIndex = state.cart.findIndex(
        (item) => item.id === newItem.id
      );
      if (existingItemIndex === -1) {
        // If it doesn't exist, push the new item into the cart
        state.cart.push(newItem);
        notification.success({
          message: <h1 className=" font-poppins"> ADDED TO CART</h1>,
        });
      } else {
        // If it exists, 
        notification.warning({
          message: (
            <h1 className=" font-poppins">Item is already in the cart</h1>
          ),
        });
      }
    },

    removeItem: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    incrementQty: (state, action) => {
      const itemId = action.payload;
      const existingItemIndex = state.cart.findIndex(
        (item) => item.id === itemId
      );
      if (
        existingItemIndex !== -1 &&
        state.cart[existingItemIndex].quantity < 10
      ) {
        state.cart[existingItemIndex].quantity += 1;
      }
    },
    
    decrementQty: (state, action) => {
      const itemId = action.payload;
      const existingItemIndex = state.cart.findIndex(
        (item) => item.id === itemId
      );
      if (
        existingItemIndex !== -1 &&
        state.cart[existingItemIndex].quantity > 1
      ) {
        state.cart[existingItemIndex].quantity -= 1;
      }
    },
  }
});

export const { cartData, removeItem, incrementQty, decrementQty } =cartSlice.actions;
export const cartReducer= cartSlice.reducer;
