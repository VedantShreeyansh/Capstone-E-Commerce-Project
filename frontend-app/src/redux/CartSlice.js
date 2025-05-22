import { createSlice } from '@reduxjs/toolkit';

const loadCartFromLocalStorage = () => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : []; 
};

const saveCartToLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: loadCartFromLocalStorage(), 
  reducers: {
    addToCart: (state, action) => {
      const existing = state.find(item => item.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
      saveCartToLocalStorage(state);
    },
    increaseQuantity: (state, action) => {
      const item = state.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      }
      saveCartToLocalStorage(state);
    },
    decreaseQuantity: (state, action) => {
      const item = state.find(item => item.id === action.payload.id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        return state.filter((p) => p.id !== action.payload.id);
      }
      saveCartToLocalStorage(state);
    },
    clearCart: (state) => {
      state.length = 0;
      // saveCartToLocalStorage(state);
    },
  },
});

export const { addToCart, decreaseQuantity, increaseQuantity, clearCart } = cartSlice.actions;           // Here, we are defining 3 reducers to be used
export default cartSlice.reducer;