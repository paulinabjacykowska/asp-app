import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { daysOfWeek } from '../../constants/daysOfWeek';
import { GREEN_ASP } from '../../constants/colors';

const DaysOfWeek = ({ changeChosenDay }) => {
  const [chosenDay, setChosenDay] = useState(String(new Date().getDay()));

  return (
    <View style={styles.daysOfWeekContainer}>
      {daysOfWeek.map(day => (
        <Pressable
          key={Object.keys(day)[0]}
          onPress={() => {
            setChosenDay(Object.keys(day)[0]);
            changeChosenDay(Number(Object.keys(day)[0]));
          }}
          style={styles.singleDayContainer}
        >
          <View
            style={
              chosenDay === Object.keys(day)[0]
                ? styles.circle
                : [styles.circle, { borderColor: 'black' }]
            }
          >
            <Text style={styles.daysOfWeek}>{Object.values(day)[0]}</Text>
          </View>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  daysOfWeekContainer: {
    flexDirection: 'row',
    marginRight: 19,
  },
  singleDayContainer: {
    flex: 1,
    alignItems: 'center',
  },
  circle: {
    width: 36,
    height: 36,
    borderColor: GREEN_ASP,
    borderWidth: 3,
    borderRadius: 90,
    marginTop: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  daysOfWeek: {
    fontFamily: 'gs-bold',
    fontSize: 14,
    color: 'white',
  },
});

export default DaysOfWeek;
