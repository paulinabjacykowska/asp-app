import ContentLoadingAnim from '../../components/ContentLoadingAnim';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import ToTimetableIcon from '../../../assets/svg/nav-arrow.svg';
import SelectionBox from './SelectionPicker/SelectionPicker';
import React, { useState, useMemo, useEffect } from 'react';
import { findTerm, removeDuplicates, findTimetable } from './helpers';
import { useDispatch, useSelector } from 'react-redux';
import { GREEN_ASP } from '../../constants/colors';
import { selectLocale } from '../../store/general';
import { STATES } from '../../utils/stateMachine';
import * as screenNames from '../../constants/screenNames';
import {
  selectTimetablesState,
  fetchAllTimetables,
  removeTimetables,
} from '../../store/timetables';
import {
  LEVEL_OF_STUDIES,
  MODE_OF_STUDY,
  TERM_OF_STUDY,
} from '../../constants/timetableTranslations';

const TimetableSelection = ({ navigation, route }) => {
  const [chosenFieldOfStudy, setChosenFieldOfStudy] = useState(null);
  const [chosenTermOfStudies, setChosenTermOfStudies] = useState(null);
  const { timetables, loading } = useSelector(selectTimetablesState);
  const locale = useSelector(selectLocale);
  const dispatch = useDispatch();
  useEffect(() => {
    setChosenFieldOfStudy(null);
    setChosenTermOfStudies(null);

    if (!locale) return;
    dispatch(removeTimetables());
    return dispatch(fetchAllTimetables()).abort;
  }, [locale]);

  useMemo(() => {
    if (route.params !== undefined) {
      setChosenFieldOfStudy(null);
      setChosenTermOfStudies(null);
    }
  }, [route.params]);

  const listOfChoicesElements = useMemo(
    () =>
      timetables.map(timetable => ({
        field_of_study_concat: `${timetable.field_of_study} (${
          LEVEL_OF_STUDIES[timetable.level_of_studies]
        } ${MODE_OF_STUDY[timetable.mode_of_study]})`,
        term_of_study: TERM_OF_STUDY[timetable.term_of_study],
        timetable: timetable,
      })),
    [timetables]
  );

  const sortedTimetable = useMemo(
    () =>
      removeDuplicates(listOfChoicesElements).sort((first, second) =>
        first.field_of_study_concat > second.field_of_study_concat ? 1 : -1
      ),
    [listOfChoicesElements]
  );

  const sortedTerms = useMemo(
    () =>
      findTerm(
        listOfChoicesElements,
        chosenFieldOfStudy
      ).sort((first, second) =>
        first.term_of_study > second.term_of_study ? 1 : -1
      ),
    [listOfChoicesElements, chosenFieldOfStudy]
  );

  if (loading === STATES.pending) {
    return <ContentLoadingAnim />;
  }

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        paddingHorizontal: 19,
        backgroundColor: 'white',
      }}
    >
      <View style={styles.selectionContainer}>
        <SelectionBox
          items={sortedTimetable.map((item, index) => ({
            label: item.field_of_study_concat,
            key: index,
          }))}
          heading="Kierunek studów:"
          title="Kierunek studiów"
          value={chosenFieldOfStudy}
          onChangeValue={value => {
            setChosenFieldOfStudy(value);
            setChosenTermOfStudies(null);
          }}
        />
        <SelectionBox
          items={sortedTerms.map((term, index) => ({
            label: term.term_of_study,
          }))}
          heading="Rok:"
          title="Rok studiów"
          value={chosenTermOfStudies}
          onChangeValue={value => {
            setChosenTermOfStudies(value);
          }}
          disabled={chosenFieldOfStudy === null}
        />

        <Pressable
          disabled={chosenTermOfStudies === null}
          style={styles.showTimetableButton}
          onPress={() =>
            navigation.navigate(screenNames.CHOSEN_TIMETABLE, {
              chosenTimetable: findTimetable(
                listOfChoicesElements,
                chosenFieldOfStudy,
                chosenTermOfStudies
              ),
            })
          }
        >
          <Text
            style={
              chosenTermOfStudies === null
                ? [styles.showTimetable, { opacity: 0.15 }]
                : styles.showTimetable
            }
          >
            pokaż plan
          </Text>
          <ToTimetableIcon
            style={
              chosenTermOfStudies === null
                ? [styles.toTimetableIcon, { opacity: 0.35 }]
                : styles.toTimetableIcon
            }
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  selectionContainer: {
    width: '100%',
    marginTop: 25,
    backgroundColor: GREEN_ASP,
    paddingHorizontal: 21,
  },
  showTimetableButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 46,
    marginBottom: 22,
  },
  showTimetable: {
    fontFamily: 'gs-bold',
    fontSize: 16,
    letterSpacing: 0.8,
  },
  toTimetableIcon: {
    transform: [{ rotateY: '180deg' }],
    marginLeft: 12.47,
  },
});

export default TimetableSelection;
