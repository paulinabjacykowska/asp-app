import DateLocalizationStripe from '../../components/DateLocalizationStripe';
import { findImageUrisWithBestQuality } from '../../utils/imagesHelpers';
import useLocaledDocument from '../../utils/hooks/useLocaledDocument';
import ContentLoadingAnim from '../../components/ContentLoadingAnim';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { BLUE_ASP, ORANGE_ASP } from '../../constants/colors';
import { GS_BOLD, GS_REGULAR } from '../../constants/fonts';
import AddToCalendarButton from './AddToCalendarButton';
import ImageSwiper from '../../components/ImageSwiper';
import { getEventById } from '../../services/api';
import ShareButton from './ShareButton';
import moment from 'moment';
import React from 'react';

export default function EventDetails({ route, navigation }) {
  const { event: propEvent } = route.params;
  const [event, isEventLoading] = useLocaledDocument(getEventById, propEvent);
  if (!event) {
    navigation.goBack();
    return <ContentLoadingAnim />;
  }
  if (isEventLoading) {
    return <ContentLoadingAnim />;
  }

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ padding: 19, flex: 1 }}>
        <View style={styles.eventDetailsBar} />
        <Text style={styles.title}>{event.title}</Text>
        <View style={{ marginHorizontal: -19 }}>
          <ImageSwiper imageUris={findImageUrisWithBestQuality(event)} />
        </View>

        <Text style={styles.shortDescription}>{event.short_description}</Text>

        {event.start_time && (
          <DateLocalizationStripe
            date={moment(event.start_time).format('DD/MM/YYYY')}
            time={moment(event.start_time).format('HH:mm')}
            place={event.place}
            isBold
          />
        )}

        <Text style={styles.longDescription}>{event.long_description}</Text>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <AddToCalendarButton />
        <ShareButton />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  eventDetailsBar: {
    width: '100%',
    height: 8,
    backgroundColor: ORANGE_ASP,
  },

  title: {
    fontFamily: GS_BOLD,
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
  },
  shortDescription: {
    marginTop: 20,
    fontSize: 14,
    fontFamily: GS_BOLD,
    lineHeight: 17,
  },
  longDescription: {
    marginTop: 20,
    fontSize: 14,
    fontFamily: GS_REGULAR,
    lineHeight: 22,
  },

  appButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: BLUE_ASP,
    marginTop: 10,
    paddingTop: 15,
    paddingBottom: 15,
    width: '50%',
    textAlign: 'center',
    flexDirection: 'row',
  },
  appButtonText: {
    fontSize: 20,
    color: '#fff',
    fontFamily: GS_REGULAR,
    justifyContent: 'center',
    textAlignVertical: 'center',
    alignItems: 'center',
  },
  appButtonParticipationContainer: {
    flex: 1,
    backgroundColor: ORANGE_ASP,
    marginTop: 10,
    paddingTop: 15,
    paddingBottom: 15,
    width: '50%',
    textAlign: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
