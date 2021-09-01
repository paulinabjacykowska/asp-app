import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { GREY_ASP } from '../../constants/colors';
import { GS_BOLD } from '../../constants/fonts';
import MarkdownASP from '../../components/MarkdownASP';

export default function Contact({ item }) {
  return (
    <>
      <View style={styles.contactField}>
        <Text style={styles.contactTitle}>{item.title}</Text>
        <MarkdownASP text={item.text} />
      </View>
      <View style={styles.contactFieldBorder} />
    </>
  );
}

const styles = StyleSheet.create({
  contactField: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    borderStyle: 'solid',
    marginRight: 15,
  },
  contactFieldBorder: {
    flex: 1,
    backgroundColor: GREY_ASP,
    padding: 0.5,
    borderStyle: 'solid',
    marginLeft: 15,
    marginRight: 15,
    width: '90%',
  },
  contactTitle: {
    flex: 1,
    fontFamily: GS_BOLD,
    fontSize: 14,
    marginTop: 10,
    marginBottom: 10,
  },
});
