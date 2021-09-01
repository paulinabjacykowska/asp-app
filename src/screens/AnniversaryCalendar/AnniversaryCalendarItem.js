import { Image, StyleSheet } from 'react-native';
import React from 'react';
import { findImageUrisWithBestQuality } from '../../utils/imagesHelpers';

export default function AnniversaryCalendarItem({ post }) {
  const imageHeight = post.images[0].formats.thumbnail.height;
  const imageWidth = post.images[0].formats.thumbnail.width;
  const aspectRatio = imageWidth / imageHeight;

  return (
    <Image
      source={{
        uri: findImageUrisWithBestQuality(post)[0],
      }}
      style={[styles.image, { aspectRatio }]}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    marginTop: 10,
    marginRight: 19,
    marginLeft: 19,
  },
});
