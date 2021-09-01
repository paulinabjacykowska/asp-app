import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { sliceHour } from './helpers';

const Gap = ({ gap }) => {
  return (
    <View style={styles.gapContainer}>
      <View style={styles.gapHoursContainer}>
        <Text style={styles.gapHour}>{sliceHour(gap.start_hour)}</Text>
        <Text style={styles.gapHour}>{sliceHour(gap.end_hour)}</Text>
      </View>
      <View style={styles.gapNameContainer}>
        <Text style={styles.gap}>PRZERWA</Text>
        <Text></Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gapContainer: {
    height: 70,
    backgroundColor: '#EFEFEF',
    marginBottom: 9.5,
    flexDirection: 'row',
    marginLeft: 19.5,
    marginRight: 18.5,
  },
  gapHoursContainer: {
    flexDirection: 'column',
    paddingLeft: 21.5,
    marginRight: 23,
    paddingRight: 22,
    paddingTop: 15,
  },
  gapNameContainer: {
    flex: 1,
    height: 35,
    marginTop: 24,
    marginRight: 35.5,
  },
  gapHour: {
    fontFamily: 'gs-bold',
    fontSize: 14,
    letterSpacing: 0.7,
    marginBottom: 5,
  },
  gap: {
    fontFamily: 'gs-bold-italic',
    fontSize: 16,
  },
});

export default Gap;
