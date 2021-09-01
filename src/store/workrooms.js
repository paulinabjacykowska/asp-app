import { publishedDateComparator } from '../utils/apiHelpers';
import { STATES } from '../utils/stateMachine';
import * as api from '../services/api';
import {
  createEntityAdapter,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import { selectLocale } from './general';

export const fetchWorkroomById = createAsyncThunk(
  'workrooms/fetchWorkroomById',
  (workroomId, thunkAPI) => {
    return api.getWorkroomById(workroomId, {
      locale: selectLocale(thunkAPI.getState()),
    });
  },
  {
    condition(id, api) {
      return !selectors.selectById(api.getState(), id);
    },
  }
);

export const fetchAllWorkrooms = createAsyncThunk(
  'workrooms/fetchAllWorkrooms',
  api.getWorkrooms
);

const workroomsAdapter = createEntityAdapter({
  sortComparer: publishedDateComparator,
});

const workroomsSlice = createSlice({
  name: 'workrooms',
  initialState: workroomsAdapter.getInitialState({
    loading: STATES.idle,
  }),
  reducers: {
    removeWorkrooms: workroomsAdapter.removeAll,
  },
  extraReducers: {
    [fetchAllWorkrooms.fulfilled]: (state, { payload }) => {
      workroomsAdapter.upsertMany(state, payload);
      state.loading = STATES.idle;
    },
    [fetchAllWorkrooms.rejected]: state => {
      state.loading = STATES.error;
    },
    [fetchAllWorkrooms.pending]: state => {
      state.loading = STATES.pending;
    },

    [fetchWorkroomById.fulfilled]: (state, { payload }) => {
      workroomsAdapter.upsertOne(state, payload);
      state.loading = STATES.idle;
    },
    [fetchWorkroomById.rejected]: state => {
      state.loading = STATES.error;
    },
    [fetchWorkroomById.pending]: state => {
      state.loading = STATES.pending;
    },
  },
});

const selectors = workroomsAdapter.getSelectors(state => state.workrooms);

export const selectWorkroomById = id => state => {
  const workroom = selectors.selectById(state, id);
  const { loading } = state.workrooms;
  return { workroom, loading };
};

export const { removeWorkrooms } = workroomsSlice.actions;

export default workroomsSlice.reducer;
