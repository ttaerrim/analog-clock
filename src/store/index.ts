import { configureStore } from '@reduxjs/toolkit';
import timerReducer from './timerSlice';

export const store = configureStore({
  reducer: {
    timers: timerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
