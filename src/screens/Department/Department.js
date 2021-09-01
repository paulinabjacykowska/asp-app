import { BLUE_ASP, GREY_ASP, LIGHT_GREY_ASP } from '../../constants/colors';
import ImageWithPlaceholder from '../../components/ImageWithPlaceholder';
import { findImageUrisWithBestQuality } from '../../utils/imagesHelpers';
import GraphicsDesignIcon from '../../../assets/svg/graphics_design.svg';
import ArtisticGraphics from '../../../assets/svg/atristic_graphics.svg';
import useLocaledDocument from '../../utils/hooks/useLocaledDocument';
import ContentLoadingAnim from '../../components/ContentLoadingAnim';
import StripeSwitchBoard from '../../components/StripeSwitchBoard';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import ArtMediaIcon from '../../../assets/svg/art_media.svg';
import { GS_BOLD, GS_REGULAR } from '../../constants/fonts';
import RowAuthority from '../AuthorityFaculty/RowAuthority';
import OpenWorkroomButton from './OpenWorkroomButton';
import * as screenNames from '../../constants/screenNames';
import { getDepartmentById } from '../../services/api';
import React from 'react';

const ICONS = {
  computer_mouse: GraphicsDesignIcon,
  laptop: ArtMediaIcon,
  paintbrush: ArtisticGraphics,
};

export default function Department({ navigation, route }) {
  const { department: propDepartment } = route.params;
  const [department, isDepartmentLoading] = useLocaledDocument(
    getDepartmentById,
    propDepartment
  );
  if (!department) {
    navigation.goBack();
    return <ContentLoadingAnim />;
  }
  if (isDepartmentLoading) {
    return <ContentLoadingAnim />;
  }

  return (
    <ScrollView>
      <StripeSwitchBoard
        title={department.name}
        IconPrep={ICONS[department.icon]}
      />
      <ImageWithPlaceholder
        source={{ uri: findImageUrisWithBestQuality(department)[0] }}
        style={styles.photoPart}
      />

      {department.head_of_department && (
        <RowAuthority
          photoUri={
            findImageUrisWithBestQuality(department.head_of_department)[0]
          }
          title={department.head_of_department.position}
          subtitle={department.head_of_department.full_name}
          email={department.head_of_department.email}
          onPress={() =>
            navigation.navigate(screenNames.WORKER_SCREEN, {
              worker: department.head_of_department,
            })
          }
        />
      )}
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>o katedrze</Text>
        <Text>{department.description}</Text>
        <Text style={styles.sectionTitle}>pracownie</Text>

        {department.workrooms
          ?.filter(({ workroom }) => !!workroom)
          .map(({ workroom }, index) => (
            <OpenWorkroomButton
              key={workroom.id + index}
              workroom={workroom}
              onPress={() =>
                navigation.navigate(screenNames.WORKROOM, {
                  workroom,
                  iconPrepWorkroom: ICONS[department.icon],
                })
              }
            />
          ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    marginTop: 15,
    paddingTop: 10,
    borderTopWidth: 2,
    borderTopColor: LIGHT_GREY_ASP,
    color: GREY_ASP,
    fontSize: 16,
    fontFamily: GS_BOLD,
    paddingBottom: 20,
  },
  photoPart: {
    aspectRatio: 2.5,
    width: '100%',
  },
  container: {
    marginRight: 19,
    marginLeft: 19,
  },
  blueTile: {
    backgroundColor: BLUE_ASP,
    color: 'white',
    padding: 10,
  },
  blueTileTitle: {
    fontFamily: GS_BOLD,
    fontSize: 18,
    color: 'white',
    paddingBottom: 25,
  },
  blueTileSubtitle: {
    fontFamily: GS_REGULAR,
    fontSize: 14,
    color: 'white',
  },
});
