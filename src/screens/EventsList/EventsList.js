import InfiniteFlatList from '../../components/InfiniteFlatList';
import * as screenNames from '../../constants/screenNames';
import { useScrollToTop } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { STATES } from '../../utils/stateMachine';
import React, { useRef } from 'react';
import EventItem from './EventsItem';
import {
  selectEventsState,
  fetchNextEvents,
  refreshEvents,
} from '../../store/events';

const EventsList = ({ navigation }) => {
  const { events, loading, hasMore } = useSelector(selectEventsState);
  const dispatch = useDispatch();

  const listRef = useRef(null);
  useScrollToTop(listRef);

  return (
    <InfiniteFlatList
      ref={listRef}
      data={events}
      keyExtractor={item => String(item.id)}
      renderItem={({ item: event, index }) => (
        <EventItem
          event={event}
          index={index}
          onPress={() =>
            navigation.navigate(screenNames.EVENT_DETAILS, { event })
          }
        />
      )}
      hasMore={hasMore}
      isRefreshing={loading === STATES.refreshing}
      onLoadNext={() => dispatch(fetchNextEvents())}
      onRefresh={() => dispatch(refreshEvents())}
    />
  );
};

export default EventsList;
