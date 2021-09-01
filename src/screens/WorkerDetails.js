import { GREY_ASP, LIGHT_GREY_ASP, ORANGE_ASP } from '../constants/colors';
import { findImageUrisWithBestQuality } from '../utils/imagesHelpers';
import useLocaledDocument from '../utils/hooks/useLocaledDocument';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import ContentLoadingAnim from '../components/ContentLoadingAnim';
import { GS_BOLD, GS_REGULAR } from '../constants/fonts';
import ImageSwiper from '../components/ImageSwiper';
import MarkdownASP from '../components/MarkdownASP';
import React, { useEffect, useState } from 'react';
import { getWorkerById } from '../services/api';

export default function WorkerDetails({ route, navigation }) {
  const { worker: propWorker, workerTitle } = route.params;

  const [fetchedWorker, setFetchedWorker] = useState(propWorker);
  useEffect(() => {
    getWorkerById(fetchedWorker.id, { locale: fetchedWorker.locale })
      .then(setFetchedWorker)
      .catch(console.warn);
  }, []);

  const [worker, isWorkerLoading] = useLocaledDocument(
    getWorkerById,
    fetchedWorker
  );
  if (!worker) {
    navigation.goBack();
    return <ContentLoadingAnim />;
  }
  if (isWorkerLoading) {
    return <ContentLoadingAnim />;
  }

  return (
    <ScrollView>
      {workerTitle && <Text style={styles.workerTitle}>{workerTitle}</Text>}

      <View style={styles.orangeBorder} />
      <View style={styles.container}>
        <Text style={[styles.sectionText, styles.workerPositionTitle]}>
          {worker.position}
        </Text>

        <Text style={styles.sectionText}>{worker.full_name}</Text>
        <Text style={[styles.sectionText, styles.workerEmail]}>
          {worker.email}
        </Text>
      </View>

      <ImageSwiper imageUris={findImageUrisWithBestQuality(worker)} />

      {worker.text_sections?.map((textSection, index) => (
        <View
          style={[
            styles.container,
            index !== worker.text_sections.length - 1 && styles.extraBorder,
          ]}
        >
          <Text style={styles.sectionTitle}>{textSection.title}</Text>
          <MarkdownASP text={textSection.text} />
        </View>
      ))}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  workerTitle: {
    paddingTop: 20,
    paddingHorizontal: 20,
    color: GREY_ASP,
    fontSize: 16,
    fontFamily: GS_BOLD,
  },
  orangeBorder: {
    borderTopWidth: 7,
    borderTopColor: ORANGE_ASP,
    marginTop: 19,
    paddingTop: 19,
    marginRight: 19,
    marginLeft: 19,
  },
  workerPositionTitle: {
    textTransform: 'lowercase',
    fontFamily: GS_BOLD,
  },
  workerEmail: {
    color: ORANGE_ASP,
    paddingTop: 10,
  },
  container: {
    marginLeft: 19,
    marginRight: 19,
    paddingBottom: 19,
  },
  extraBorder: {
    borderBottomWidth: 2,
    borderBottomColor: LIGHT_GREY_ASP,
  },
  sectionTitle: {
    textTransform: 'uppercase',
    paddingTop: 20,
    color: GREY_ASP,
    fontSize: 16,
    fontFamily: GS_BOLD,
    paddingBottom: 20,
  },
  sectionText: {
    fontSize: 14,
    fontFamily: GS_REGULAR,
  },

  extraPaddingSides: {
    paddingLeft: 19,
    paddingRight: 19,
  },
});
