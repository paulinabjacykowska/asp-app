import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import ClockIcon from '../../assets/svg/clock.svg';
import LocationIcon from '../../assets/svg/location.svg';
import { LIGHT_GREY_ASP, ORANGE_ASP } from '../constants/colors';
import { GS_BOLD, GS_REGULAR } from '../constants/fonts';
import moment from 'moment';

export default function DateLocalizationStripe({ date, time, place, isBold }) {
  return (
    <View style={styles.row}>
      <View style={[styles.subBar, styles.clockBar]}>
        <ClockIcon width={30} height={'100%'} color="#ffffff" />
        <View style={styles.column}>
          <Text style={[styles.clockDate, isBold && styles.boldFont]}>
            {date.trim()}
          </Text>
          {time && <Text style={styles.clockTime}>{time.trim()}</Text>}
        </View>
      </View>
      <View style={[styles.subBar, styles.locationBar]}>
        <LocationIcon width={30} height={'100%'} color="#ffffff" />
        <View style={styles.column}>
          <Text style={[styles.location, isBold && styles.boldFont]}>
            {place.trim()}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  clockBar: {
    paddingLeft: 19,
  },
  locationBar: {
    paddingRight: 19,
  },
  subBar: {
    paddingBottom: 10,
    paddingTop: 10,
    flex: 1,
    textAlign: 'center',
    flexDirection: 'row',
    height: '100%',
    backgroundColor: LIGHT_GREY_ASP,
    marginTop: 20,
  },
  boldFont: {
    fontFamily: GS_BOLD,
  },
  clockDate: {
    fontSize: 11,
    fontFamily: GS_REGULAR,
    marginLeft: 5,
  },
  clockTime: {
    fontSize: 11,
    fontFamily: GS_REGULAR,
    marginLeft: 5,
    marginTop: 3,
  },
  location: {
    fontSize: 11,
    fontFamily: GS_REGULAR,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingRight: 10,
    textAlignVertical: 'center',
    marginLeft: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
  },
});
