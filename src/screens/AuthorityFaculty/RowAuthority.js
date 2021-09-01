import ImageWithPlaceholder from '../../components/ImageWithPlaceholder';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { BLUE_ASP, ORANGE_ASP } from '../../constants/colors';
import { GS_BOLD, GS_REGULAR } from '../../constants/fonts';
import React from 'react';

export default function RowAuthority({
  title,
  subtitle,
  email,
  isBlueStripe,
  photoUri,
  onPress,
}) {
  return (
    <Pressable
      style={styles.row}
      onPress={onPress}
      android_ripple={{ color: '#00000010' }}
    >
      <Image source={{ uri: photoUri }} style={styles.photo} />
      <View style={styles.rightSideRow}>
        <View style={[styles.shortStripe, isBlueStripe && styles.blueStripe]} />
        <Text style={styles.rowPersonTitle}>{title}</Text>
        <Text style={styles.rowPersonName}>{subtitle}</Text>
        <Text style={styles.rowPersonEmail}>{email}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  photo: {
    width: '35%',
    aspectRatio: 1,
  },
  row: {
    margin: 19,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowPersonName: {
    fontFamily: GS_REGULAR,
    fontSize: 14,
  },
  rowPersonTitle: {
    fontFamily: GS_BOLD,
    fontSize: 17,
  },
  rightSideRow: {
    paddingLeft: 19,
    flex: 1,
  },
  shortStripe: {
    backgroundColor: ORANGE_ASP,
    height: 7,
    width: 74,
    marginBottom: 5,
  },
  blueStripe: {
    backgroundColor: BLUE_ASP,
  },
  rowPersonEmail: {
    fontFamily: GS_REGULAR,
    fontSize: 14,
    position: 'absolute',
    bottom: 0,
    paddingLeft: 19,
    color: ORANGE_ASP,
  },
});
