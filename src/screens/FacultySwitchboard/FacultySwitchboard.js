import { selectDepartmentsState } from '../../store/departments';
import * as screenNames from '../../constants/screenNames';
import { ScrollView } from 'react-native-gesture-handler';
import { View, Text, StyleSheet } from 'react-native';
import { GREY_ASP } from '../../constants/colors';
import { GS_BOLD } from '../../constants/fonts';
import TileSwitchboard from './TileSwitchboard';
import { useSelector } from 'react-redux';
import { selectPinnedTimetable } from '../../store/timetables';
import React from 'react';

const DEPARTMENT_ICONS_NAMES = {
  computer_mouse: 'computer_mouse',
  laptop: 'laptop',
  paintbrush: 'paintbrush',
};

export default function FacultySwitchboard({ navigation }) {
  const { departments } = useSelector(selectDepartmentsState);
  const pinnedTimetable = useSelector(selectPinnedTimetable);

  return (
    <ScrollView style={styles.mainScrollView}>
      <Text style={styles.sectionTitle}>plany zajęć</Text>
      <View style={styles.sectionTitleTiles}>
        <TileSwitchboard
          animatedIconName="timetable"
          title="plany zajęć"
          resizeMode="cover"
          onPress={() =>
            pinnedTimetable
              ? navigation.navigate(screenNames.CHOSEN_TIMETABLE, {
                  chosenTimetable: pinnedTimetable,
                })
              : navigation.navigate(screenNames.TIMETABLE_SELECTION)
          }
        />
      </View>
      <Text style={styles.sectionTitle}>wydział</Text>
      <View style={styles.sectionTitleTiles}>
        <View style={styles.row}>
          <TileSwitchboard
            animatedIconName="authorities"
            title="władze wydziału"
            onPress={() =>
              navigation.navigate(screenNames.AUTHORITY_DEPARTMENT)
            }
          />
          <TileSwitchboard
            animatedIconName="contact"
            title="kontakt"
            onPress={() => {
              navigation.navigate(screenNames.CONTACT_SCREEN);
            }}
          />
        </View>
      </View>

      {!!departments.length && (
        <>
          <Text style={styles.sectionTitle}>katedry</Text>
          <View style={styles.sectionTitleTiles}>
            {departments.map(department => (
              <TileSwitchboard
                key={department.id}
                animatedIconName={DEPARTMENT_ICONS_NAMES[department.icon]}
                title={department.name}
                isBlue
                onPress={() =>
                  navigation.navigate(screenNames.ARTISTIC_GRAPHICS, {
                    department,
                  })
                }
              />
            ))}
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainScrollView: {
    paddingLeft: 14,
    paddingRight: 14,
  },
  sectionTitle: {
    fontFamily: GS_BOLD,
    fontSize: 20,
    color: GREY_ASP,
    marginLeft: 5,
    marginTop: 15,
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionTitleTiles: {
    marginBottom: 10,
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
