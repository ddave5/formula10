import { configureStore } from '@reduxjs/toolkit';
import errorReducer from './slices/ErrorSlice';
import authReducer from './slices/AuthSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    error: errorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;