import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "Cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const cantidad = action.payload.cantidad ? action.payload.cantidad : 1;
      if (
        state.find((item) => item.id_producto === action.payload.id_producto)
      ) {
        state.map((item) => {
          if (item.id_producto === action.payload.id_producto) {
            item.cantidad += cantidad;
          }
        });
        return state;
      } else {
        state.push({
          ...action.payload,
          cantidad: cantidad,
        });
      }
    },
    removeFromCart: (state, action) => {
      return state.filter((item) => item.id_producto !== action.payload);
    },
    increment: (state, action) => {
      state.map((item) => {
        if (item.id_producto === action.payload) {
          item.cantidad += 1;
        }
      });
    },
    decrement: (state, action) => {
      state.map((item) => {
        if (item.id_producto === action.payload && item.cantidad > 1) {
          item.cantidad -= 1;
        }
      });
    },
  },
});

export const { addToCart, removeFromCart, increment, decrement } = cartSlice.actions;
export const selectCart = (state) => state.cartState;
export default cartSlice.reducer;
