import anniversaryPostsReducer from './anniversaryPosts';
import facultyContactReducer from './facultyContact';
import notificationsReducer from './notifications';
import { configureStore } from '@reduxjs/toolkit';
import facultyStuffReducer from './facultyStuff';
import departmentsReducer from './departments';
import timetablesReducer from './timetables';
import workroomsReducer from './workrooms';
import generalReducer from './general';
import eventsReducer from './events';

const store = configureStore({
  reducer: {
    general: generalReducer,
    events: eventsReducer,
    notifications: notificationsReducer,
    anniversaryPosts: anniversaryPostsReducer,
    departments: departmentsReducer,
    facultyStuff: facultyStuffReducer,
    facultyContact: facultyContactReducer,
    workrooms: workroomsReducer,
    timetables: timetablesReducer,
  },
});

export default store;
