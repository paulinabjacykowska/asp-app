import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import useLocaledDocument from '../../utils/hooks/useLocaledDocument';
import ContentLoadingAnim from '../../components/ContentLoadingAnim';
import { GS_BOLD, GS_REGULAR } from '../../constants/fonts';
import { getNotificationById } from '../../services/api';
import MarkdownASP from '../../components/MarkdownASP';
import ShareIcon from '../../../assets/svg/share.svg';
import moment from 'moment';
import React from 'react';
import {
  LIGHT_GREY_ASP,
  ORANGE_ASP,
  GREY_ASP,
  BLUE_ASP,
} from '../../constants/colors';

export default function NotificationDetails({ route, navigation }) {
  const { notification: propNotification } = route.params;
  const [notification, isNotificationLoading] = useLocaledDocument(
    getNotificationById,
    propNotification
  );
  if (!notification) {
    navigation.goBack();
    return <ContentLoadingAnim />;
  }
  if (isNotificationLoading) {
    return <ContentLoadingAnim />;
  }

  return (
    <ScrollView
      style={styles.whiteBackground}
      contentContainerStyle={[styles.contentContainerStyleForScrollView]}
    >
      <View
        style={[
          styles.mainView,
          notification.is_important && styles.importantNotification,
        ]}
      >
        <Text style={styles.title}>{notification.title}</Text>
        <Text style={styles.shortDescription}>
          {notification.short_description}
        </Text>
        <Text style={styles.date}>
          {moment(notification.published_at).format('DD/MM/YYYY, HH:mm')}
        </Text>
        <MarkdownASP text={notification.long_description} />
      </View>
      <AppButton title="Udostępnij" />
    </ScrollView>
  );
}

const AppButton = ({ title }) => (
  <Pressable style={styles.appButtonContainer}>
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <ShareIcon width={30} height={30} color="#ffffff" />
      <Text style={styles.appButtonText}>{title}</Text>
    </View>
  </Pressable>
);

const styles = StyleSheet.create({
  contentContainerStyleForScrollView: {
    flexGrow: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  appButtonContainer: {
    backgroundColor: BLUE_ASP,
    marginTop: 10,
    paddingTop: 15,
    paddingBottom: 15,
    width: '100%',
    textAlign: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  appButtonText: {
    fontSize: 20,
    color: '#fff',
    fontFamily: GS_REGULAR,
    justifyContent: 'center',
    textAlignVertical: 'center',
    alignItems: 'center',
  },
  whiteBackground: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  importantNotification: {
    borderTopColor: ORANGE_ASP,
  },
  mainView: {
    paddingTop: 10,
    marginTop: 15,
    borderTopColor: BLUE_ASP,
    borderTopWidth: 10,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: GS_BOLD,
  },
  shortDescription: {
    marginTop: 20,
    fontSize: 14,
    fontFamily: GS_REGULAR,
  },
  date: {
    marginTop: 10,
    color: GREY_ASP,
    fontSize: 10,
    fontFamily: GS_REGULAR,
    paddingBottom: 10,
    borderBottomColor: LIGHT_GREY_ASP,
    borderBottomWidth: 2,
  },
  longDescription: {
    marginTop: 20,
    fontSize: 14,
    fontFamily: GS_REGULAR,
  },
});
