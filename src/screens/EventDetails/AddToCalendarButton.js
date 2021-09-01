import { Pressable, StyleSheet, Text, View } from 'react-native';
import ShareIcon from '../../../assets/svg/share.svg';
import ParticipationIcon from '../../../assets/svg/participation.svg';
import React from 'react';
import { BLUE_ASP, LIGHT_GREY_ASP, ORANGE_ASP } from '../../constants/colors';
import { GS_BOLD, GS_REGULAR } from '../../constants/fonts';

const AddToCalendarButton = () => (
  <Pressable style={styles.appButtonParticipationContainer}>
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <ParticipationIcon width={30} height={30} color="#ffffff" />
      <Text style={styles.appButtonText}>Wezmę udział</Text>
    </View>
  </Pressable>
);

const styles = StyleSheet.create({
  title: {
    fontFamily: GS_BOLD,
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
  },
  appButtonText: {
    fontSize: 20,
    color: '#fff',
    fontFamily: GS_REGULAR,
    justifyContent: 'center',
    textAlignVertical: 'center',
    alignItems: 'center',
  },
  appButtonParticipationContainer: {
    flex: 1,
    backgroundColor: ORANGE_ASP,
    marginTop: 10,
    paddingTop: 15,
    paddingBottom: 15,
    width: '50%',
    textAlign: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default AddToCalendarButton;
