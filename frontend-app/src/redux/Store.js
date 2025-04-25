import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice';

// This is where your reducer is defined

const store = configureStore({
  reducer: {
    cart: cartReducer, // Fix: Use the correct reducer name
  },
});

export default store;