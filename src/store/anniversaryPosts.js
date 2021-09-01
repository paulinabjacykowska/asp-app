import { STATES } from '../utils/stateMachine';
import * as api from '../services/api';
import {
  createEntityAdapter,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import { selectLocale } from './general';

export const fetchAllAnniversaryPosts = createAsyncThunk(
  'anniversaryPosts/fetchAllAnniversaryPosts',
  (_, thunkAPI) => {
    return api.getAnniversaryPosts({
      locale: selectLocale(thunkAPI.getState()),
    });
  }
);

const anniversaryPostsAdapter = createEntityAdapter({
  sortComparer: (first, second) => first.year - second.year,
});

const anniversaryPostsSlice = createSlice({
  name: 'anniversaryPosts',
  initialState: anniversaryPostsAdapter.getInitialState({
    loading: STATES.idle,
  }),
  reducers: {
    removeAnniversaryPosts: anniversaryPostsAdapter.removeAll,
  },
  extraReducers: {
    [fetchAllAnniversaryPosts.fulfilled]: (state, { payload }) => {
      anniversaryPostsAdapter.upsertMany(state, payload);
      state.loading = STATES.idle;
    },
    [fetchAllAnniversaryPosts.rejected]: state => {
      state.loading = STATES.error;
    },
    [fetchAllAnniversaryPosts.pending]: state => {
      state.loading = STATES.pending;
    },
  },
});

export const { removeAnniversaryPosts } = anniversaryPostsSlice.actions;

export const {
  selectAll: selectAllAnniversaryPosts,
} = anniversaryPostsAdapter.getSelectors(state => state.anniversaryPosts);

export default anniversaryPostsSlice.reducer;
