import AnniversaryCalendar from './screens/AnniversaryCalendar/AnniversaryCalendar';
import NotificationDetails from './screens/NotificationDetails/NotificationDetails';
import FacultySwitchboard from './screens/FacultySwitchboard/FacultySwitchboard';
import AuthorityFaculty from './screens/AuthorityFaculty/AuthorityFaculty';
import NotificationList from './screens/NotificationList/NotificationList';
import { DETAILS_TRANSITION_CONFIG } from './constants/screenTransitions';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TimetableSelection from './screens/TimetableSelection/TimetableSelection';
import ChosenTimetable from './screens/ChosenTimetable/ChosenTimetable';
import { createStackNavigator } from '@react-navigation/stack';
import EventDetails from './screens/EventDetails/EventDetails';
import GraduateCupIcon from '../assets/svg/graduate-cup.svg';
import AnniversaryIcon from '../assets/svg/anniversary.svg';
import { TAP_BAR_OPTIONS } from './constants/tabBarOptions';
import Department from './screens/Department/Department';
import EventsList from './screens/EventsList/EventsList';
import * as screenNames from './constants/screenNames';
import CalendarIcon from '../assets/svg/calendar.svg';
import Workroom from './screens/Workroom';
import WorkerDetails from './screens/WorkerDetails';
import AppHeader from './components/AppHeader';
import RingIcon from './components/RingIcon';
import React from 'react';
import ContactList from './screens/Contacts/ContactList';

const MainTab = createBottomTabNavigator();
export const MainTabNavigator = () => (
  <MainTab.Navigator tabBarOptions={TAP_BAR_OPTIONS}>
    <MainTab.Screen
      name={screenNames.EVENTS_NAVIGATOR}
      component={EventsStackNavigator}
      options={{ tabBarIcon: CalendarIcon }}
    />
    <MainTab.Screen
      name={screenNames.NOTIFICATIONS_NAVIGATOR}
      component={NotificationsStackNavigator}
      options={{ tabBarIcon: RingIcon }}
    />
    <MainTab.Screen
      name={screenNames.DEPARTMENT_SWITCHBOARD_NAVIGATOR}
      component={DepartmentSwitchboardStackNavigator}
      options={{ tabBarIcon: GraduateCupIcon }}
    />
    <MainTab.Screen
      name={screenNames.ANNIVERSARY_NAVIGATOR}
      component={AnniversaryStackNavigator}
      options={{ tabBarIcon: AnniversaryIcon }}
    />
  </MainTab.Navigator>
);

const EventsStack = createStackNavigator();
const EventsStackNavigator = () => (
  <EventsStack.Navigator
    screenOptions={{
      title: 'wydarzenia',
      header: props => <AppHeader {...props} />,
      ...DETAILS_TRANSITION_CONFIG,
    }}
  >
    <EventsStack.Screen name={screenNames.EVENTS_LIST} component={EventsList} />
    <EventsStack.Screen
      name={screenNames.EVENT_DETAILS}
      component={EventDetails}
    />
  </EventsStack.Navigator>
);

const NotificationsStack = createStackNavigator();
const NotificationsStackNavigator = () => (
  <NotificationsStack.Navigator
    screenOptions={{
      title: 'komunikaty',
      header: props => <AppHeader {...props} />,
      ...DETAILS_TRANSITION_CONFIG,
    }}
  >
    <NotificationsStack.Screen
      name={screenNames.NOTIFICATIONS_LIST}
      component={NotificationList}
    />
    <NotificationsStack.Screen
      name={screenNames.NOTIFICATION_DETAILS}
      component={NotificationDetails}
    />
  </NotificationsStack.Navigator>
);

const DepartmentSwitchboardStack = createStackNavigator();
const DepartmentSwitchboardStackNavigator = () => (
  <DepartmentSwitchboardStack.Navigator
    screenOptions={{
      title: 'wydział',
      header: props => <AppHeader {...props} />,
      ...DETAILS_TRANSITION_CONFIG,
    }}
  >
    <DepartmentSwitchboardStack.Screen
      name={screenNames.DEPARTMENT_SWITCHBOARD}
      component={FacultySwitchboard}
    />
    <DepartmentSwitchboardStack.Screen
      name={screenNames.TIMETABLE_SELECTION}
      component={TimetableSelection}
      options={{ title: 'plan zajęć' }}
    />
    <DepartmentSwitchboardStack.Screen
      name={screenNames.CHOSEN_TIMETABLE}
      component={ChosenTimetable}
      options={{ title: 'plan zajęć' }}
    />
    <DepartmentSwitchboardStack.Screen
      name={screenNames.ARTISTIC_GRAPHICS}
      component={Department}
    />
    <DepartmentSwitchboardStack.Screen
      name={screenNames.AUTHORITY_DEPARTMENT}
      component={AuthorityFaculty}
      options={{ title: 'władze wydziału' }}
    />
    <DepartmentSwitchboardStack.Screen
      name={screenNames.WORKROOM}
      component={Workroom}
      options={{ title: 'katedra' }}
    />
    <DepartmentSwitchboardStack.Screen
      name={screenNames.WORKER_SCREEN}
      component={WorkerDetails}
    />
    <DepartmentSwitchboardStack.Screen
      name={screenNames.CONTACT_SCREEN}
      component={ContactList}
    />
  </DepartmentSwitchboardStack.Navigator>
);

const AnniversaryStack = createStackNavigator();
const AnniversaryStackNavigator = () => (
  <AnniversaryStack.Navigator
    screenOptions={{
      title: 'kalendarium',
      header: props => <AppHeader {...props} />,
      ...DETAILS_TRANSITION_CONFIG,
    }}
  >
    <MainTab.Screen
      name={screenNames.ANNIVERSARY_CALENDAR_LIST_SCREEN}
      component={AnniversaryCalendar}
    />
  </AnniversaryStack.Navigator>
);
