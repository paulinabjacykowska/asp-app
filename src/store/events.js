import { publishedDateComparator } from '../utils/apiHelpers';
import { STATES } from '../utils/stateMachine';
import * as api from '../services/api';
import {
  createEntityAdapter,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import { selectLocale } from './general';

export const FETCHED_EVENTS_LIMIT = 10;

export const fetchNextEvents = createAsyncThunk(
  'events/fetchNextEvents',
  (start, thunkAPI) => {
    return api.getEvents({
      start: selectAllEvents(thunkAPI.getState()).length,
      limit: FETCHED_EVENTS_LIMIT,
      locale: selectLocale(thunkAPI.getState()),
    });
  },
  {
    condition(arg, api) {
      const { loading, hasMore } = api.getState().events;
      return loading === STATES.idle && hasMore;
    },
  }
);

export const refreshEvents = createAsyncThunk(
  'events/refreshEvents',
  (_, thunkAPI) =>
    api.getEvents({
      start: 0,
      limit: FETCHED_EVENTS_LIMIT,
      locale: selectLocale(thunkAPI.getState()),
    }),
  {
    condition(arg, api) {
      const { loading } = api.getState().events;
      return loading === STATES.idle;
    },
  }
);

const eventsAdapter = createEntityAdapter({
  sortComparer: publishedDateComparator,
});

const eventsSlice = createSlice({
  name: 'events',
  initialState: eventsAdapter.getInitialState({
    loading: STATES.idle,
    hasMore: true,
  }),
  reducers: {
    removeEvents(state) {
      eventsAdapter.removeAll(state);
      state.loading = STATES.idle;
      state.hasMore = true;
    },
  },
  extraReducers: {
    [fetchNextEvents.pending]: state => {
      state.loading = STATES.pending;
      state.hasMore = true;
    },
    [fetchNextEvents.fulfilled]: (state, { payload }) => {
      eventsAdapter.addMany(state, payload);
      state.loading = STATES.idle;
      if (payload.length < FETCHED_EVENTS_LIMIT) {
        state.hasMore = false;
      }
    },
    [fetchNextEvents.rejected]: state => {
      state.loading = STATES.error;
      state.hasMore = false;
    },

    [refreshEvents.pending]: state => {
      state.loading = STATES.refreshing;
      state.hasMore = true;
    },
    [refreshEvents.fulfilled]: (state, { payload }) => {
      eventsAdapter.removeAll(state);
      eventsAdapter.addMany(state, payload);
      state.loading = STATES.idle;
      if (payload.length < FETCHED_EVENTS_LIMIT) {
        state.hasMore = false;
      }
    },
    [refreshEvents.rejected]: state => {
      state.loading = STATES.error;
      state.hasMore = false;
    },
  },
});

export const { selectAll: selectAllEvents } = eventsAdapter.getSelectors(
  state => state.events
);
export const selectEventsState = state => {
  const { loading, hasMore } = state.events;
  return {
    events: selectAllEvents(state),
    loading,
    hasMore,
  };
};

export const { removeEvents } = eventsSlice.actions;

export default eventsSlice.reducer;
