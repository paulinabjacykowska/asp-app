import { publishedDateComparator } from '../utils/apiHelpers';
import { STATES } from '../utils/stateMachine';
import { selectLocale } from './general';
import * as api from '../services/api';
import {
  createEntityAdapter,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

export const FETCHED_NOTIFICATIONS_LIMIT = 10;

export const fetchNextNotifications = createAsyncThunk(
  'notifications/fetchNextNotifications',
  (start, thunkAPI) => {
    return api.getNotifications({
      start: selectAllNotifications(thunkAPI.getState()).length,
      limit: FETCHED_NOTIFICATIONS_LIMIT,
      locale: selectLocale(thunkAPI.getState()),
    });
  },
  {
    condition(arg, api) {
      const { loading, hasMore } = api.getState().notifications;
      return loading === STATES.idle && hasMore;
    },
  }
);

export const refreshNotifications = createAsyncThunk(
  'notifications/refreshNotifications',
  (_, thunkAPI) =>
    api.getNotifications({
      start: 0,
      limit: FETCHED_NOTIFICATIONS_LIMIT,
      locale: selectLocale(thunkAPI.getState()),
    }),
  {
    condition(arg, api) {
      const { loading } = api.getState().notifications;
      return loading === STATES.idle;
    },
  }
);

const notificationsAdapter = createEntityAdapter({
  sortComparer: publishedDateComparator,
});

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: notificationsAdapter.getInitialState({
    loading: STATES.idle,
    hasMore: true,
    areUnread: false,
  }),
  reducers: {
    upsertNotification(state, { payload }) {
      if (payload.locale !== selectLocale(state)) return;

      notificationsAdapter.upsertOne(state, payload);
      state.areUnread = true;
    },
    checkUnreadNotifications(state) {
      state.areUnread = false;
    },
    removeNotifications(state) {
      notificationsAdapter.removeAll(state);
      state.loading = STATES.idle;
      state.hasMore = true;
    },
  },
  extraReducers: {
    [fetchNextNotifications.pending]: state => {
      state.loading = STATES.pending;
      state.hasMore = true;
    },
    [fetchNextNotifications.fulfilled]: (state, { payload }) => {
      notificationsAdapter.upsertMany(state, payload);
      state.loading = STATES.idle;
      if (payload.length < FETCHED_NOTIFICATIONS_LIMIT) {
        state.hasMore = false;
      }
    },
    [fetchNextNotifications.rejected]: state => {
      state.loading = STATES.error;
      state.hasMore = false;
    },

    [refreshNotifications.pending]: state => {
      state.loading = STATES.refreshing;
      state.hasMore = true;
    },
    [refreshNotifications.fulfilled]: (state, { payload }) => {
      notificationsAdapter.removeAll(state);
      notificationsAdapter.addMany(state, payload);
      state.loading = STATES.idle;
      if (payload.length < FETCHED_NOTIFICATIONS_LIMIT) {
        state.hasMore = false;
      }
    },
    [refreshNotifications.rejected]: state => {
      state.loading = STATES.error;
      state.hasMore = false;
    },
  },
});

export const {
  upsertNotification,
  checkUnreadNotifications,
  removeNotifications,
} = notificationsSlice.actions;
export const {
  selectAll: selectAllNotifications,
} = notificationsAdapter.getSelectors(state => state.notifications);

export const selectAreUnreadNotifications = state =>
  state.notifications.areUnread;

export const selectNotificationsState = state => {
  const { loading, hasMore } = state.notifications;
  return {
    notifications: selectAllNotifications(state),
    loading,
    hasMore,
  };
};

export default notificationsSlice.reducer;
