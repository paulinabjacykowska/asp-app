import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { STATES } from '../utils/stateMachine';
import { selectLocale } from './general';
import * as api from '../services/api';

export const fetchFacultyStuff = createAsyncThunk(
  'facultyStuff/fetchFacultyStuff',
  (_, thunkAPI) => {
    return api.getFacultyStuff({
      locale: selectLocale(thunkAPI.getState()),
    });
  },
  {
    condition(arg, api) {
      return !api.getState().facultyStuff.facultyStuff;
    },
  }
);

const facultyStuffSlice = createSlice({
  name: 'facultyStuff',
  initialState: {
    facultyStuff: null,
    loading: STATES.idle,
  },
  reducers: {
    removeFacultyStuff: state => {
      state.facultyStuff = null;
    },
  },
  extraReducers: {
    [fetchFacultyStuff.fulfilled]: (state, { payload }) => {
      state.facultyStuff = payload;
      state.loading = STATES.idle;
    },
    [fetchFacultyStuff.rejected]: state => {
      state.loading = STATES.error;
    },
    [fetchFacultyStuff.pending]: state => {
      state.loading = STATES.pending;
    },
  },
});

export const selectFacultyStuff = state => state.facultyStuff;

export const { removeFacultyStuff } = facultyStuffSlice.actions;

export default facultyStuffSlice.reducer;
