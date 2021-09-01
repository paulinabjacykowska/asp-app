import LottieView from 'lottie-react-native';
import React from 'react';

const ContentLoadingAnim = ({ style, ...props }) => (
  <LottieView
    source={require('../../assets/lottie/small_loader.json')}
    resizeMode="cover"
    autoSize
    autoPlay
    loop
    style={[{ width: '100%' }, style]}
    {...props}
  />
);

export default ContentLoadingAnim;
