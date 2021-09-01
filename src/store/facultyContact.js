import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { STATES } from '../utils/stateMachine';
import { selectLocale } from './general';
import * as api from '../services/api';

export const fetchFacultyContact = createAsyncThunk(
  'facultyContact/fetchFacultyContact',
  (_, thunkAPI) => {
    return api.getFacultyContact({
      locale: selectLocale(thunkAPI.getState()),
    });
  }
);

const facultyContactSlice = createSlice({
  name: 'facultyContact',
  initialState: {
    facultyContact: null,
    loading: STATES.idle,
  },
  reducers: {
    removeFacultyContact: state => {
      state.facultyContact = null;
    },
  },
  extraReducers: {
    [fetchFacultyContact.fulfilled]: (state, { payload }) => {
      state.facultyContact = payload;
      state.loading = STATES.idle;
    },
    [fetchFacultyContact.rejected]: state => {
      state.loading = STATES.error;
    },
    [fetchFacultyContact.pending]: state => {
      state.loading = STATES.pending;
    },
  },
});

export const selectFacultyContact = state =>
  state.facultyContact.facultyContact;

export const { removeFacultyContact } = facultyContactSlice.actions;

export default facultyContactSlice.reducer;
