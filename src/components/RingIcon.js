import { selectAreUnreadNotifications } from '../store/notifications';
import RingAnimDark from '../../assets/lottie/ring.json';
import React, { useRef, useEffect } from 'react';
import LottieView from 'lottie-react-native';
import { useSelector } from 'react-redux';

const RingAnimBright = JSON.parse(JSON.stringify(RingAnimDark));
RingAnimBright.assets[0].layers[1].shapes[0].it[2].c.k = [0.69, 0.69, 0.69, 1];
RingAnimBright.assets[0].layers[1].shapes[1].it[1].c.k = [0.69, 0.69, 0.69, 1];
RingAnimBright.assets[0].layers[1].shapes[2].it[2].c.k = [0.69, 0.69, 0.69, 1];

const LAST_ANIMATION_STEP = 22;

const RingIcon = ({ width, height, focused }) => {
  const areUnreadNotifications = useSelector(selectAreUnreadNotifications);
  const iconRef = useRef(null);

  useEffect(() => {
    if (areUnreadNotifications) {
      iconRef.current?.play(0, LAST_ANIMATION_STEP);
    } else {
      iconRef.current?.reset();
    }
  }, [areUnreadNotifications]);

  return (
    <LottieView
      ref={iconRef}
      source={focused ? RingAnimBright : RingAnimDark}
      loop={false}
      style={{ width, height }}
    />
  );
};

export default RingIcon;
