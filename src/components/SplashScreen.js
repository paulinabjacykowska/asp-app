import { View, StyleSheet, useWindowDimensions, Platform } from 'react-native';
import React, { useRef, useEffect, useState } from 'react';
import { ORANGE_ASP } from '../constants/colors';
import LottieView from 'lottie-react-native';
import { StatusBar } from 'expo-status-bar';

const SplashScreen = () => {
  const dimensions = useWindowDimensions();
  const [hasInitStarted, setHasInitStarted] = useState(false);
  const [hasInitEnded, setHasInitEnded] = useState(false);
  const [hasTransitionEnded, setHasTransitionEnded] = useState(false);

  const initAnimRef = useRef(null);
  const transitionAnimRef = useRef(null);

  useEffect(() => {
    if (initAnimRef.current && !hasInitStarted) {
      initAnimRef?.current.play(0, 50);
      setHasInitStarted(true);
    }
  }, [initAnimRef.current, hasInitStarted]);

  if (hasTransitionEnded) return null;

  return (
    <View style={styles.root}>
      <StatusBar style="light" />

      {!hasInitEnded && (
        <View style={styles.logoAnimContainer}>
          <LottieView
            ref={initAnimRef}
            source={require('../../assets/lottie/initial.json')}
            loop={false}
            style={{ width: '100%' }}
            onAnimationFinish={() => {
              setHasInitEnded(true);
              transitionAnimRef?.current.play(0, 18);
            }}
          />
        </View>
      )}

      <LottieView
        ref={transitionAnimRef}
        source={require('../../assets/lottie/splash_transition.json')}
        loop={false}
        style={
          Platform.OS === 'android'
            ? { height: '100%' }
            : { width: dimensions.width }
        }
        resizeMode="cover"
        onAnimationFinish={() => setHasTransitionEnded(true)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFill,
    backgroundColor: ORANGE_ASP,
    justifyContent: 'center',
    zIndex: 2,
  },

  logoAnimContainer: {
    ...StyleSheet.absoluteFill,
    zIndex: 3,
  },
});

export default SplashScreen;
