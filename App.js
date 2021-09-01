import { fetchNextEvents, removeEvents } from './src/store/events';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { removeFacultyStuff } from './src/store/facultyStuff';
import { removeTimetables } from './src/store/timetables';
import SplashScreen from './src/components/SplashScreen';
import { DefaultTheme } from '@react-navigation/native';
import { removeWorkrooms } from './src/store/workrooms';
import React, { useEffect, useState } from 'react';
import { MainTabNavigator } from './src/routing';
import { pipe } from './src/utils/functional';
import { StatusBar } from 'expo-status-bar';
import socket from './src/services/socket';
import { useFonts } from 'expo-font';
import store from './src/store';
import {
  fetchAllAnniversaryPosts,
  removeAnniversaryPosts,
} from './src/store/anniversaryPosts';
import {
  fetchNextNotifications,
  removeNotifications,
  upsertNotification,
} from './src/store/notifications';
import {
  removeFacultyContact,
  fetchFacultyContact,
} from './src/store/facultyContact';
import {
  fetchAllDepartments,
  removeDepartments,
} from './src/store/departments';
import {
  restoreGeneral,
  selectLocale,
  storeGeneral,
} from './src/store/general';

import {
  restorePinnedTimetable,
  storePinnedTimetable,
  selectPinnedTimetable,
} from './src/store/timetables';

const fonts = {
  'gs-bold': require('./assets/fonts/GeppertSans-Bold.otf'),
  'gs-bold-italic': require('./assets/fonts/GeppertSans-BoldItalic.otf'),
  'gs-book': require('./assets/fonts/GeppertSans-Book.otf'),
  'gs-book-italic': require('./assets/fonts/GeppertSans-BookItalic.otf'),
  'gs-medium': require('./assets/fonts/GeppertSans-Medium.otf'),
  'gs-regular': require('./assets/fonts/GeppertSans-Regular.otf'),
  'gs-regular-italic': require('./assets/fonts/GeppertSans-RegularItalic.otf'),
};

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
  },
};

const App = () => {
  const [areFontsLoaded] = useFonts(fonts);
  const pinnedTimetable = useSelector(selectPinnedTimetable);

  const dispatch = useDispatch();
  const locale = useSelector(selectLocale);

  useEffect(() => {
    dispatch(restoreGeneral());
    dispatch(restorePinnedTimetable());

    socket.on('notification', payload => {
      dispatch(upsertNotification(payload));
    });
    return () => {
      socket.removeAllListeners('notifications');
    };
  }, []);

  useEffect(() => {
    dispatch(storePinnedTimetable());
  }, [pinnedTimetable]);

  useEffect(() => {
    dispatch(storeGeneral());

    if (!locale) return;
    dispatch(removeAnniversaryPosts());
    dispatch(removeDepartments());
    dispatch(removeEvents());
    dispatch(removeFacultyContact());
    dispatch(removeFacultyStuff());
    dispatch(removeNotifications());
    dispatch(removeTimetables());
    dispatch(removeWorkrooms());

    return pipe(
      dispatch(fetchNextEvents()).abort,
      dispatch(fetchNextNotifications()).abort,
      dispatch(fetchAllAnniversaryPosts()).abort,
      dispatch(fetchAllDepartments()).abort,
      dispatch(fetchFacultyContact()).abort
    );
  }, [locale]);

  return (
    <NavigationContainer theme={theme}>
      <StatusBar style="auto" />
      {areFontsLoaded && <MainTabNavigator />}
      <SplashScreen />
    </NavigationContainer>
  );
};

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default Root;
