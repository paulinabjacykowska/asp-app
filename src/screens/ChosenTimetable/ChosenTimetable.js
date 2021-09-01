import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import TopBlackStripe from './TopBlackStripe';
import ClassesAndGaps from './ClassesAndGaps';

const TimetableSelection = ({ route, navigation }) => {
  const { chosenTimetable } = route.params;
  const [chosenDay, setChosenDay] = useState(new Date().getDay());
  const changeChosenDay = chosenDay => {
    setChosenDay(chosenDay);
  };

  return (
    <View style={{ flex: 1 }}>
      <TopBlackStripe
        chosenTimetable={chosenTimetable}
        navigation={navigation}
        changeChosenDay={changeChosenDay}
      />
      <ClassesAndGaps chosenTimetable={chosenTimetable} chosenDay={chosenDay} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default TimetableSelection;
