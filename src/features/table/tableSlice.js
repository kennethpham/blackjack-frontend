import { createSlice } from '@reduxjs/toolkit';

/**
 *  @typedef {Object} TableStore
 *  @property {String} uuid
 *  @property {String[]} uuidList
 */

export const tableSlice = createSlice({
  name: 'table',
  /** @type {TableStore} */
  initialState: {
    /** @type {String} **/
    uuid: '',
    /** @type {String[]} **/
    uuidList: [],
  },
  reducers: {
    addPlayer: (state, action) => {
      state.uuidList.push(action.payload);
    },
    addUuid: (state, action) => {
      state.uuid = action.payload;
      console.log('updated adduuid:', action.payload);
    },
    removePlayer: (state, action) => {
      const index = state.uuidList.indexOf(action.payload);
      if (index > -1) {
        state.uuidList.splice(index, 1);
      }
    },
    updatePlayers: (state, action) => {
      state.uuidList = action.payload;
    },
  },
});

// Action creators
export const { addPlayer, addUuid, removePlayer, updatePlayers } =
  tableSlice.actions;

export default tableSlice.reducer;
