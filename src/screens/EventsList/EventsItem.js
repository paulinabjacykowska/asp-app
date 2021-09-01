import { findImageUrisWithBestQuality } from '../../utils/imagesHelpers';
import ImageWithPlaceholder from '../../components/ImageWithPlaceholder';
import { checkEven, checkFourth } from '../../utils/numbersHelpers';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { ORANGE_ASP, GREEN_ASP } from '../../constants/colors';
import { GS_BOLD } from '../../constants/fonts';
import moment from 'moment';
import React from 'react';

export default function EventItem({ event, onPress, index }) {
  const contentColor = checkFourth(index + 1)
    ? 'white'
    : checkEven(index + 1)
    ? 'black'
    : 'black';

  const imageHeight = event.images[0]?.formats.thumbnail.height || 0;
  const imageWidth = event.images[0]?.formats.thumbnail.width || 0;
  const aspectRatio = imageHeight && imageWidth ? imageWidth / imageHeight : 2;

  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          padding: 19,
          backgroundColor: checkEven(index + 1)
            ? checkFourth(index + 1)
              ? ORANGE_ASP
              : GREEN_ASP
            : 'white',
        }}
      >
        <View style={styles.row}>
          <View style={[styles.bar, { backgroundColor: contentColor }]} />
          <Text style={[styles.date, { color: contentColor }]}>
            {moment(event.published_at).format('DD/MM/YYYY')}
          </Text>
        </View>
        <Text style={[styles.title, { color: contentColor }]}>
          {event.title}
        </Text>
        <View>
          {!!aspectRatio && (
            <ImageWithPlaceholder
              style={[styles.regularImage, { aspectRatio }]}
              source={{ uri: findImageUrisWithBestQuality(event)[0] }}
            />
          )}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  bar: {
    width: '25%',
    height: 8,
    backgroundColor: 'black',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  title: {
    fontFamily: GS_BOLD,
    fontSize: 16,
    marginTop: 5,
    marginBottom: 5,
  },

  date: {
    fontFamily: GS_BOLD,
    fontSize: 11,
  },

  regularImage: {
    marginTop: 10,
    marginBottom: 20,
    width: '100%',
  },
});
