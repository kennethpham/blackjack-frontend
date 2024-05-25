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
    updatePlayers: (state, action) => {
      state.value = action.payload;
    }
  },
});

// Action creators
export const { addPlayer, removePlayer, updatePlayers } = tableSlice.actions;

export default tableSlice.reducer;
