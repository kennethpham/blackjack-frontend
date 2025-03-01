import { configureStore } from '@reduxjs/toolkit';
import tableReducer from './features/table/tableSlice';

/** @type {import('@reduxjs/toolkit').Store} */
export default configureStore({
  reducer: {
    table: tableReducer,
  },
});
