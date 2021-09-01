import { StyleSheet, Text, View } from 'react-native';
import { BLUE_ASP, ORANGE_ASP } from '../constants/colors';
import { GS_BOLD } from '../constants/fonts';
import React from 'react';

export default function StripeSwitchBoard({ title, IconPrep, isBlue }) {
  return (
    <View style={[styles.stripe, isBlue && styles.blueStripe]}>
      <Text style={styles.stripeTitle}>{title}</Text>
      <IconPrep style={styles.icon} />
    </View>
  );
}

const styles = StyleSheet.create({
  blueStripe: {
    backgroundColor: BLUE_ASP,
  },
  stripe: {
    width: '100%',
    backgroundColor: ORANGE_ASP,
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlignVertical: 'center',
    alignItems: 'center',
    paddingRight: 19,
  },
  stripeTitle: {
    color: 'white',
    fontSize: 19,
    fontFamily: GS_BOLD,
    flex: 1,
    textAlignVertical: 'center',
    paddingLeft: 19,
  },
  icon: {
    height: 34,
    width: 34,
    color: 'white',
  },
});
