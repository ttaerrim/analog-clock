import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './index';

interface TimerState {
  hour: number;
  minute: number;
  second: number;
}

const initialState: TimerState = {
  hour: new Date().getHours(),
  minute: new Date().getMinutes(),
  second: new Date().getSeconds(),
};

export const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    updateHour: (state, action: PayloadAction<number>) => {
      state.hour = action.payload;
    },
    updateMinute: (state, action: PayloadAction<number>) => {
      state.minute = action.payload;
    },
    updateSecond: (state, action: PayloadAction<number>) => {
      state.second = action.payload;
    },
  },
});

export const { updateHour, updateMinute, updateSecond } = timerSlice.actions;

export const selectCount = (state: RootState) => state.timers;

export default timerSlice.reducer;
