import InfiniteFlatList from '../../components/InfiniteFlatList';
import { StyleSheet, SectionList, Text } from 'react-native';
import * as screenNames from '../../constants/screenNames';
import { useFocusEffect } from '@react-navigation/native';
import { useScrollToTop } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import React, { useCallback, useRef } from 'react';
import { STATES } from '../../utils/stateMachine';
import NotificationItem from './NotificationItem';
import { GREY_ASP } from '../../constants/colors';
import { GS_BOLD } from '../../constants/fonts';
import {
  selectNotificationsState,
  checkUnreadNotifications,
  fetchNextNotifications,
  refreshNotifications,
} from '../../store/notifications';

export default function NotificationList({ navigation }) {
  const { notifications, loading, hasMore } = useSelector(
    selectNotificationsState
  );
  const dispatch = useDispatch();
  useFocusEffect(
    useCallback(() => {
      dispatch(checkUnreadNotifications());
    }, [])
  );

  const listRef = useRef(null);
  useScrollToTop(listRef);

  const sectionLists = getSectionLists(notifications);
  const DATA = [
    {
      title: 'dzisiaj',
      data: sectionLists.todayList,
    },
    {
      title: 'w tym tygodniu',
      data: sectionLists.thisWeekList,
    },
    {
      title: 'starsze',
      data: sectionLists.olderList,
    },
  ];

  return (
    <InfiniteFlatList
      component={SectionList}
      sections={DATA}
      ref={listRef}
      keyExtractor={item => String(item.id)}
      renderItem={({ item: notification }) => (
        <NotificationItem
          item={notification}
          onPress={() =>
            navigation.navigate(screenNames.NOTIFICATION_DETAILS, {
              notification,
            })
          }
        />
      )}
      renderSectionHeader={({ section: { title, data } }) =>
        data.length ? <Text style={styles.header}>{title}</Text> : null
      }
      hasMore={hasMore}
      contentContainerStyle={styles.contentContainer}
      isRefreshing={loading === STATES.refreshing}
      onLoadNext={() => dispatch(fetchNextNotifications())}
      onRefresh={() => dispatch(refreshNotifications())}
      onScroll={({ nativeEvent: { contentInset } }) => {
        if (contentInset.top === 0) {
          dispatch(checkUnreadNotifications());
        }
      }}
      scrollEventThrottle={400}
      stickySectionHeadersEnabled={false}
    />
  );
}

function getSectionLists(notificationsData) {
  const todayList = [];
  const thisWeekList = [];
  const olderList = [];
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const lastWeek = new Date(now);
  lastWeek.setDate(now.getDate() - 7);
  for (let notification of notificationsData) {
    const dateNotification = new Date(notification.created_at);
    dateNotification.setHours(0, 0, 0, 0);
    if (dateNotification.getTime() === now.getTime()) {
      todayList.push(notification);
    } else if (
      dateNotification.getTime() < now.getTime() &&
      dateNotification.getTime() > lastWeek.getTime() &&
      dateNotification.getDay() < now.getDay()
    ) {
      thisWeekList.push(notification);
    } else {
      olderList.push(notification);
    }
  }
  return { todayList, thisWeekList, olderList };
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 20,
  },
  header: {
    fontSize: 20,
    color: GREY_ASP,
    fontFamily: GS_BOLD,
    backgroundColor: 'white',
    paddingLeft: 19,
    paddingTop: 15,
  },
});
