import ImageWithPlaceholder from './ImageWithPlaceholder';
import { ORANGE_ASP } from '../constants/colors';
import { StyleSheet, View } from 'react-native';
import Swiper from 'react-native-swiper';
import React from 'react';

const ImageSwiper = ({ imageUris }) => {
  if (!imageUris?.length) return null;

  return (
    <View style={styles.root}>
      <Swiper
        showButtons
        dot={<View style={styles.dot} />}
        activeDot={<View style={styles.activeDot} />}
        paginationStyle={styles.paginationStyle}
      >
        {imageUris.map(uri => (
          <View key={uri} style={styles.photoContainer}>
            <ImageWithPlaceholder style={styles.photo} source={{ uri }} />
          </View>
        ))}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    aspectRatio: 1.5,
  },

  photoContainer: {
    paddingHorizontal: 19,
  },
  photo: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },

  dot: {
    width: 5,
    height: 5,
    margin: 3,
    borderRadius: 4,
    backgroundColor: 'rgba(0,0,0,.2)',
  },
  activeDot: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 8,
    height: 8,
    margin: 3,
    borderRadius: 4,
    backgroundColor: ORANGE_ASP,
  },

  paginationStyle: { bottom: 17 },
});

export default ImageSwiper;
