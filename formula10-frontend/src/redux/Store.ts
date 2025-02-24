import { configureStore } from '@reduxjs/toolkit';
import errorReducer from './slices/ErrorSlice';
import authReducer from './slices/AuthSlice';
import groupReducer from './slices/GroupSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    error: errorReducer,
    groups: groupReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;