import { createSlice } from '@reduxjs/toolkit';

export const tableSlice = createSlice({
  name: 'table',
  initialState: {
    /** @type {String[]} **/
    value: [],
  },
  reducers: {
    addPlayer: (state, action) => {
      state.value.push(action.payload);
    },
    removePlayer: (state, action) => {
      const index = state.value.indexOf(action.payload);
      if (index > -1) {
        state.value.splice(index, 1);
      }
    },
  },
});

// Action creators
export const { addPlayer, removePlayer } = tableSlice.actions;

export default tableSlice.reducer;
