import { StyleSheet, Text, View, Pressable } from 'react-native';
import { GS_BOLD, GS_REGULAR } from '../../constants/fonts';
import useWorkroom from '../../utils/hooks/useWorkroom';
import { BLUE_ASP } from '../../constants/colors';
import React from 'react';

export default function OpenWorkroomButton({
  workroom: propWorkroom,
  onPress,
}) {
  const [workroom] = useWorkroom(propWorkroom.id);
  if (!workroom) {
    return null;
  }

  return (
    <Pressable
      style={styles.blueTile}
      onPress={onPress}
      android_ripple={{ color: '#00000010' }}
    >
      <Text style={styles.blueTileTitle}>{workroom.title}</Text>
      <View>
        {workroom?.workers?.map(({ worker }) => (
          <Text style={styles.blueTileSubtitle} key={worker.id}>
            {worker.full_name}
          </Text>
        ))}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  blueTile: {
    backgroundColor: BLUE_ASP,
    color: 'white',
    padding: 20,
    marginBottom: 10,
    height: 150,
    justifyContent: 'space-between',
  },
  blueTileTitle: {
    fontFamily: GS_BOLD,
    fontSize: 16,
    color: 'white',
    paddingBottom: 25,
  },
  blueTileSubtitle: {
    fontFamily: GS_REGULAR,
    fontSize: 14,
    color: 'white',
    bottom: 0,
  },
});
