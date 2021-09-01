import { Pressable, StyleSheet, Text, View } from 'react-native';
import ShareIcon from '../../../assets/svg/share.svg';
import React from 'react';
import { BLUE_ASP, LIGHT_GREY_ASP, ORANGE_ASP } from '../../constants/colors';
import { GS_BOLD, GS_REGULAR } from '../../constants/fonts';

const ShareButton = () => (
  <Pressable style={styles.appButtonContainer}>
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <ShareIcon width={30} height={30} color="#ffffff" />
      <Text style={styles.appButtonText}>Udostępnij</Text>
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
  appButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: BLUE_ASP,
    marginTop: 10,
    paddingTop: 15,
    paddingBottom: 15,
    width: '50%',
    textAlign: 'center',
    flexDirection: 'row',
  },
  appButtonText: {
    fontSize: 20,
    color: '#fff',
    fontFamily: GS_REGULAR,
    justifyContent: 'center',
    textAlignVertical: 'center',
    alignItems: 'center',
  },
});

export default ShareButton;
