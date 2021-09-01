import React, { useState, useEffect } from 'react';
import { GREEN_ASP } from '../../constants/colors';
import { View, Text, StyleSheet } from 'react-native';
import {
  findCurrentClass,
  timeToMinutes,
  findTimeDifferenceInMinutes,
  sliceHour,
} from './helpers';

const HEIGHT_OF_SINGLE_CLASS_TILE = 164.5;

const SingleClass = ({ singleClass, chosenDay }) => {
  const startTime = timeToMinutes(singleClass.start_hour);
  const endTime = timeToMinutes(singleClass.end_hour);

  const classDurationInMinutes = endTime - startTime;
  const elapsedClassTime = findTimeDifferenceInMinutes(singleClass.start_hour);

  const [marginShift, setMarginShift] = useState(
    (HEIGHT_OF_SINGLE_CLASS_TILE / classDurationInMinutes) * elapsedClassTime
  );

  useEffect(() => {
    const interval = setInterval(
      () =>
        setMarginShift(
          parseFloat(
            marginShift + HEIGHT_OF_SINGLE_CLASS_TILE / classDurationInMinutes
          )
        ),
      60000
    );
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <View>
      <View
        style={
          findCurrentClass(singleClass, chosenDay)
            ? [styles.orangeStripe, { marginTop: marginShift }]
            : [styles.orangeStripe, { backgroundColor: 'transparent' }]
        }
      />
      <View
        style={
          findCurrentClass(singleClass, chosenDay)
            ? [styles.singleClassContainer, styles.currentClassGreenAccents]
            : styles.singleClassContainer
        }
      >
        <View
          style={
            findCurrentClass(singleClass, chosenDay)
              ? [
                  styles.hoursContainer,
                  { backgroundColor: GREEN_ASP, paddingLeft: 16.5 },
                ]
              : styles.hoursContainer
          }
        >
          <Text style={styles.hour}>{sliceHour(singleClass.start_hour)}</Text>
          <Text style={styles.hour}>{sliceHour(singleClass.end_hour)}</Text>
        </View>
        <View style={styles.classInfoContainer}>
          <Text style={styles.className}>{singleClass.course_name_pl}</Text>
          <Text style={styles.address}>
            {singleClass.addresses_and_lecturers[0].address}
          </Text>
          <Text style={styles.lecturer}>
            {singleClass.addresses_and_lecturers[0].worker.full_name}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  orangeStripe: {
    height: 5,
    width: '100%',
    backgroundColor: '#FF6143',
    position: 'absolute',
  },
  singleClassContainer: {
    height: HEIGHT_OF_SINGLE_CLASS_TILE,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(107, 107, 107, 0.2)',
    marginLeft: 19.5,
    marginRight: 18.5,
    backgroundColor: 'white',
  },
  currentClassGreenAccents: {
    borderWidth: 5,
    borderColor: GREEN_ASP,
    borderBottomColor: GREEN_ASP,
    borderBottomWidth: 5,
  },
  hoursContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingLeft: 21.5,
    marginRight: 23,
    paddingRight: 22,
    paddingTop: 15.5,
  },
  hour: {
    fontFamily: 'gs-bold',
    fontSize: 14,
    letterSpacing: 0.7,
    marginBottom: 23.5,
  },
  classInfoContainer: {
    flex: 1,
    height: 120,
    marginTop: 6,
    marginRight: 35.5,
    paddingTop: 15.5,
    justifyContent: 'space-between',
  },
  className: {
    fontFamily: 'gs-bold',
    fontSize: 16,
    flexWrap: 'wrap',
  },
  address: {
    fontFamily: 'gs-regular',
    fontSize: 14,
    color: '#808080',
  },
  lecturer: {
    fontFamily: 'gs-regular',
    fontSize: 14,
    color: '#FF6143',
  },
});

export default SingleClass;
