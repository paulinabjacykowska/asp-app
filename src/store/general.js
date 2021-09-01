import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LOCALES } from '../constants/locales';
import { STATES } from '../utils/stateMachine';

export const storeGeneral = createAsyncThunk(
  'general/storeGeneral',
  (_, api) => {
    const { general } = api.getState();
    return AsyncStorage.setItem('@general', JSON.stringify(general));
  }
);

export const restoreGeneral = createAsyncThunk(
  'general/restoreGeneral',
  async () => {
    const response = await AsyncStorage.getItem('@general');
    const general = response ? JSON.parse(response) : null;
    return general || Promise.reject();
  }
);

const generalSlice = createSlice({
  name: 'general',
  initialState: {
    loading: STATES.pending,
    locale: null,
  },
  reducers: {
    switchLocale(state) {
      state.locale = state.locale === LOCALES.pl ? LOCALES.en : LOCALES.pl;
    },
  },
  extraReducers: {
    [restoreGeneral.fulfilled]: (state, { payload }) => {
      state.loading = STATES.idle;
      state.locale = payload.locale;
    },
    [restoreGeneral.rejected]: state => {
      state.loading = STATES.idle;
      state.locale = LOCALES.pl;
    },
  },
});

export const selectLocale = state => state.general.locale;

export const { switchLocale } = generalSlice.actions;
export default generalSlice.reducer;
