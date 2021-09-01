import { publishedDateComparator } from '../utils/apiHelpers';
import { STATES } from '../utils/stateMachine';
import { selectLocale } from './general';
import * as api from '../services/api';
import {
  createEntityAdapter,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

export const fetchAllDepartments = createAsyncThunk(
  'departments/fetchAllDepartments',
  (_, thunkAPI) => {
    return api.getDepartments({
      locale: selectLocale(thunkAPI.getState()),
    });
  },
  {
    condition(arg, api) {
      const { departments } = api.getState();
      return !departments.ids.length;
    },
  }
);

const departmentsAdapter = createEntityAdapter({
  sortComparer: publishedDateComparator,
});

const departmentsSlice = createSlice({
  name: 'departments',
  initialState: departmentsAdapter.getInitialState({
    loading: STATES.idle,
  }),
  reducers: {
    removeDepartments: departmentsAdapter.removeAll,
  },
  extraReducers: {
    [fetchAllDepartments.fulfilled]: (state, { payload }) => {
      departmentsAdapter.upsertMany(state, payload);
      state.loading = STATES.idle;
    },
    [fetchAllDepartments.rejected]: state => {
      state.loading = STATES.error;
    },
    [fetchAllDepartments.pending]: state => {
      state.loading = STATES.pending;
    },
  },
});

export const {
  selectAll: selectAllDepartments,
} = departmentsAdapter.getSelectors(state => state.departments);
export const selectDepartmentsState = state => {
  const { loading } = state.events;
  return {
    departments: selectAllDepartments(state),
    loading,
  };
};

export const { removeDepartments } = departmentsSlice.actions;

export default departmentsSlice.reducer;
