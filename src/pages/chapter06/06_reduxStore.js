import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './06_reduxCounterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});