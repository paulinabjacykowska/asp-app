import { StyleSheet, ImageBackground, Image } from 'react-native';
import { randomElement } from '../utils/arrayHelpers';
import React, { useState } from 'react';

const PLACEHOLDERS = [
  require('../../assets/image/placeholder_1.png'),
  require('../../assets/image/placeholder_2.png'),
  require('../../assets/image/placeholder_3.png'),
  require('../../assets/image/placeholder_4.png'),
];

const ImageWithPlaceholder = ({ style, imageStyle, ...imageProps }) => {
  const [placeholder] = useState(randomElement(PLACEHOLDERS));

  return (
    <ImageBackground style={style} source={placeholder}>
      <Image style={[styles.image, imageStyle]} {...imageProps} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
});

export default ImageWithPlaceholder;
