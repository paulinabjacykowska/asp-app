import React from 'react';
import { FlatList } from 'react-native';
import SingleClass from './SingleClass';
import Gap from './Gap';
import { daysOfWeekInEnglish } from '../../constants/daysOfWeek';

const ClassesAndGaps = ({ chosenTimetable, chosenDay }) => {
  let day = daysOfWeekInEnglish[chosenDay];

  return (
    <FlatList
      contentContainerStyle={{
        marginTop: 19.5,
        paddingBottom: 30,
      }}
      showsVerticalScrollIndicator={false}
      data={chosenTimetable[day]}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) =>
        item.__component === 'timetable.class' ? (
          <SingleClass singleClass={item} chosenDay={chosenDay} />
        ) : (
          <Gap gap={item} chosenDay={chosenDay} />
        )
      }
    />
  );
};

export default ClassesAndGaps;
