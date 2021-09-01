import React, { useRef, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const START_ANIMATION_FRAME = 0;
const END_ANIMATION_FRAME = 30;

const SwitchboardAnimatedIcon = ({
  animatedIconName,
  iconIsPressed,
  onAnimationFinish,
  resizeMode,
}) => {
  const sources = {
    timetable: require('../../assets/lottie/timetable.json'),
    authorities: require('../../assets/lottie/authorities.json'),
    computer_mouse: require('../../assets/lottie/computer_mouse.json'),
    contact: require('../../assets/lottie/contact.json'),
    paintbrush: require('../../assets/lottie/paintbrush.json'),
    laptop: require('../../assets/lottie/laptop.json'),
  };
  const animationRef = useRef(null);
  useEffect(() => {
    if (iconIsPressed) {
      animationRef.current.play(START_ANIMATION_FRAME, END_ANIMATION_FRAME);
    } else {
      animationRef.current.play(1, 0);
    }
  }, [iconIsPressed]);

  return (
    <View style={styles.container}>
      <LottieView
        ref={animationRef}
        loop={false}
        source={sources[animatedIconName]}
        autoPlay={false}
        onAnimationFinish={onAnimationFinish}
        style={styles.animation}
        speed={animatedIconName === 'computer_mouse' ? 0.85 : 1.6}
        resizeMode={resizeMode}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '60%',
    height: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: '70%',
    aspectRatio: 1,
  },
});

export default SwitchboardAnimatedIcon;
