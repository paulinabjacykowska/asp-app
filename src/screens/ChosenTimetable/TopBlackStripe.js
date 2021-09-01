import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import PinIcon from '../../../assets/svg/pin.svg';
import PinFilledIcon from '../../../assets/svg/pin-pinned.svg';
import ReturnToTimetableSelection from '../../../assets/svg/return-to-timetable-selection.svg';
import {
  MODE_OF_STUDY,
  TERM_OF_STUDY,
} from '../../constants/timetableTranslations';
import * as screenNames from '../../constants/screenNames';
import { selectPinnedTimetable, pinTimetable } from '../../store/timetables';
import { useDispatch, useSelector } from 'react-redux';
import DaysOfWeek from './DaysOfWeek';

const TopBlackStripe = ({ chosenTimetable, navigation, changeChosenDay }) => {
  const pinnedTimetable = useSelector(selectPinnedTimetable);
  const dispatch = useDispatch();

  return (
    <View style={styles.mainContainer}>
      <View style={styles.textAndIconsContainer}>
        <View>
          <Text style={styles.chosenClass}>
            {chosenTimetable.field_of_study}
          </Text>
          <Text style={styles.classAdditionalInfo}>
            {MODE_OF_STUDY[chosenTimetable.mode_of_study]}
          </Text>
          <Text style={styles.classAdditionalInfo}>
            {TERM_OF_STUDY[chosenTimetable.term_of_study]}
          </Text>
        </View>
        <View style={styles.iconsContainer}>
          {pinnedTimetable ? (
            pinnedTimetable.id === chosenTimetable.id ? (
              <Pressable
                hitSlop={5}
                onPress={() => dispatch(pinTimetable(chosenTimetable))}
              >
                <PinFilledIcon style={styles.pin} />
              </Pressable>
            ) : (
              <Pressable
                hitSlop={5}
                onPress={() => dispatch(pinTimetable(chosenTimetable))}
              >
                <PinIcon style={styles.pin} />
              </Pressable>
            )
          ) : (
            <Pressable
              hitSlop={5}
              onPress={() => dispatch(pinTimetable(chosenTimetable))}
            >
              <PinIcon style={styles.pin} />
            </Pressable>
          )}
          <Pressable
            onPress={() =>
              navigation.navigate(screenNames.TIMETABLE_SELECTION, {
                reset: true,
              })
            }
          >
            <ReturnToTimetableSelection
              style={styles.returnToTimetableSelectionIcon}
            />
          </Pressable>
        </View>
      </View>
      <DaysOfWeek changeChosenDay={changeChosenDay} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: 169,
    backgroundColor: 'black',
    paddingTop: 31,
    paddingBottom: 16,
    paddingLeft: 19,
    lineHeight: 22,
  },
  textAndIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chosenClass: {
    fontFamily: 'gs-bold',
    fontSize: 20,
    color: 'white',
    lineHeight: 22,
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  pin: {
    width: 30,
    height: 30,
  },
  classAdditionalInfo: {
    fontFamily: 'gs-regular',
    fontSize: 16,
    color: 'white',
    lineHeight: 22,
  },
  returnToTimetableSelectionIcon: {
    width: 30,
    height: 30,
    marginRight: 19,
    marginLeft: 10,
  },
});

export default TopBlackStripe;
