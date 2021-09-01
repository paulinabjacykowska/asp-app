import { publishedDateComparator } from '../utils/apiHelpers';
import { STATES } from '../utils/stateMachine';
import * as api from '../services/api';
import {
  createEntityAdapter,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { selectLocale } from './general';

export const fetchAllTimetables = createAsyncThunk(
  'timetables/fetchAllTimetables',
  (_, thunkAPI) => {
    return api.getTimetables({
      locale: selectLocale(thunkAPI.getState()),
    });
  },
  {
    condition(arg, api) {
      return !api.getState().timetables.ids.length;
    },
  }
);

export const storePinnedTimetable = createAsyncThunk(
  'timetables/storePinnedTimetable',
  (_, api) => {
    const { pinnedTimetable } = api.getState().timetables;
    return AsyncStorage.setItem(
      '@pinnedTimetable',
      JSON.stringify(pinnedTimetable)
    );
  }
);

export const restorePinnedTimetable = createAsyncThunk(
  'timetables/resorePinnedTimetable',
  async () => {
    const response = await AsyncStorage.getItem('@pinnedTimetable');
    const pinnedTimetable = response ? JSON.parse(response) : null;
    return pinnedTimetable || Promise.reject();
  }
);

const timetablesAdapter = createEntityAdapter({
  sortComparer: publishedDateComparator,
});

const timetablesSlice = createSlice({
  name: 'timetables',
  initialState: timetablesAdapter.getInitialState({
    loading: STATES.idle,
    pinnedTimetable: null,
  }),
  reducers: {
    pinTimetable(state, action) {
      state.pinnedTimetable =
        state.pinnedTimetable === null ? action.payload : null;
    },
    removeTimetables: timetablesAdapter.removeAll,
  },
  extraReducers: {
    [fetchAllTimetables.fulfilled]: (state, { payload }) => {
      timetablesAdapter.upsertMany(state, payload);
      state.loading = STATES.idle;
    },
    [fetchAllTimetables.rejected]: state => {
      state.loading = STATES.error;
    },
    [fetchAllTimetables.pending]: state => {
      state.loading = STATES.pending;
    },
    [restorePinnedTimetable.fulfilled]: (state, { payload }) => {
      state.pinnedTimetable = payload;
    },
    [restorePinnedTimetable.rejected]: state => {
      state.pinnedTimetable = null;
    },
  },
});

export const {
  selectAll: selectAllTimetables,
} = timetablesAdapter.getSelectors(state => state.timetables);
export const selectTimetablesState = state => {
  const { loading } = state.timetables.loading;
  return {
    timetables: selectAllTimetables(state),
    loading,
  };
};
export const selectPinnedTimetable = state => state.timetables.pinnedTimetable;

export const { pinTimetable } = timetablesSlice.actions;

export const { removeTimetables } = timetablesSlice.actions;

export default timetablesSlice.reducer;
