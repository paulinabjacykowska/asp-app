import { findImageUrisWithBestQuality } from '../utils/imagesHelpers';
import useLocaledDocument from '../utils/hooks/useLocaledDocument';
import ContentLoadingAnim from '../components/ContentLoadingAnim';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import StripeSwitchBoard from '../components/StripeSwitchBoard';
import { GREY_ASP, LIGHT_GREY_ASP } from '../constants/colors';
import RowAuthority from './AuthorityFaculty/RowAuthority';
import { GS_BOLD, GS_REGULAR } from '../constants/fonts';
import * as screenNames from '../constants/screenNames';
import useWorkroom from '../utils/hooks/useWorkroom';
import MarkdownASP from '../components/MarkdownASP';
import ImageSwiper from '../components/ImageSwiper';
import { getWorkroomById } from '../services/api';
import React from 'react';

export default function Workroom({ route, navigation }) {
  const { workroom: propWorkroom, iconPrepWorkroom } = route.params;
  const [fetchedWorkroom] = useWorkroom(propWorkroom.id);
  const [workroom, isWorkroomLoading] = useLocaledDocument(
    getWorkroomById,
    fetchedWorkroom || propWorkroom
  );
  if (!workroom) {
    navigation.goBack();
    return <ContentLoadingAnim />;
  }
  if (isWorkroomLoading) {
    return <ContentLoadingAnim />;
  }

  return (
    <ScrollView>
      <StripeSwitchBoard
        title={workroom.title}
        IconPrep={iconPrepWorkroom}
        isBlue
      />
      <View style={{ marginTop: 19 }}>
        <ImageSwiper imageUris={findImageUrisWithBestQuality(workroom)} />
      </View>

      {workroom.text_sections.map(textSection => (
        <View style={[styles.container, styles.bottomBorder]}>
          <Text style={[styles.sectionTitle, styles.extraPadding]}>
            {textSection.title}
          </Text>
          <MarkdownASP text={textSection.text} />
        </View>
      ))}
      <View>
        <Text style={[styles.sectionTitle, styles.containerNoBorder]}>
          Pracownicy
        </Text>
        {fetchedWorkroom?.workers
          .filter(({ worker }) => Boolean(worker))
          .map(({ id, worker }) => (
            <RowAuthority
              key={id}
              photoUri={findImageUrisWithBestQuality(worker)[0]}
              title={worker.position}
              subtitle={worker.full_name}
              email={worker.email}
              onPress={() =>
                navigation.push(screenNames.WORKER_SCREEN, {
                  worker,
                })
              }
            />
          ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 19,
    marginRight: 19,
    borderBottomWidth: 2,
    borderBottomColor: LIGHT_GREY_ASP,
    paddingBottom: 30,
  },
  containerNoBorder: {
    paddingLeft: 19,
    paddingRight: 19,
    marginBottom: 20,
  },
  sectionTitle: {
    textTransform: 'uppercase',
    paddingTop: 20,
    color: GREY_ASP,
    fontSize: 16,
    fontFamily: GS_BOLD,
  },
  extraPadding: {
    paddingBottom: 19,
  },
  sectionText: {
    fontSize: 14,
    fontFamily: GS_REGULAR,
  },
  wrapper: {
    marginTop: 19,
  },
});
