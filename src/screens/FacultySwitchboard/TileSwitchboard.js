import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { GS_BOLD } from '../../constants/fonts';
import { BLUE_ASP, ORANGE_ASP } from '../../constants/colors';
import { useState, useEffect } from 'react';
import SwitchboardAnimatedIcon from '../../components/SwitchboardAnimatedIcon';

export default function TileSwitchboard({
  animatedIconName,
  title,
  isBlue,
  onPress,
  resizeMode
}) {
  const [isAnimationEnded, setIsAnimationEnded] = useState(false);
  const [iconIsPressed, setIconIsPressed] = useState(false);

  useEffect(() => {
    if (iconIsPressed) {
      setTimeout(() => {
        onPress();
      }, 250);
    }
  }, [iconIsPressed]);

  useEffect(() => {
    if (isAnimationEnded) {
      setTimeout(() => {
        setIconIsPressed(false);
        setIsAnimationEnded(false);
      }, 150);
    }
  }, [isAnimationEnded]);

  return (
    <View style={styles.tileContainer}>
      <Pressable
        onPress={() => {
          setIconIsPressed(true);
        }}
        style={[styles.tile, isBlue && styles.blueBackgroundTile]}
      >
        <SwitchboardAnimatedIcon
          animatedIconName={animatedIconName}
          onAnimationFinish={() => setIsAnimationEnded(true)}
          iconIsPressed={iconIsPressed}
          resizeMode={resizeMode}
        />
        <Text style={styles.tileText}>{title}</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  tileContainer: {
    width: '50%',
    aspectRatio: 1,
    padding: 5,
  },
  tile: {
    width: '100%',
    height: '100%',
    backgroundColor: ORANGE_ASP,
    justifyContent: 'center',
    textAlignVertical: 'center',
    alignItems: 'center',
  },
  tileText: {
    fontSize: 15,
    fontFamily: GS_BOLD,
    color: 'white',
    textAlign: 'center',
  },
  blueBackgroundTile: {
    backgroundColor: BLUE_ASP,
  },
});
