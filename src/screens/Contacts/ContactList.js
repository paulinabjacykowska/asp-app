import DateLocalizationStripe from '../../components/DateLocalizationStripe';
import { StyleSheet, ScrollView, View, FlatList } from 'react-native';
import StripeSwitchBoard from '../../components/StripeSwitchBoard';
import { selectFacultyContact } from '../../store/facultyContact';
import ContactIcon from '../../../assets/svg/contact.svg';
import { GS_BOLD } from '../../constants/fonts';
import { useSelector } from 'react-redux';
import Contact from './Contact';
import React from 'react';

export default function ContactList() {
  const contact = useSelector(selectFacultyContact);
  if (!contact) return null;

  return (
    <ScrollView>
      <StripeSwitchBoard title={'kontakt'} IconPrep={ContactIcon} />
      <View>
        <View style={styles.margins}>
          <DateLocalizationStripe
            date={contact.opening_hours}
            place={contact.address}
          />
        </View>
      </View>
      <>
        <FlatList
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          data={contact.text_sections}
          keyExtractor={item => String(item.id)}
          renderItem={({ item: contact }) => <Contact item={contact} />}
        />
      </>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  margins: {
    paddingLeft: 19,
    paddingRight: 19,
    paddingBottom: 19,
    flex: 1,
  },
  title: {
    fontFamily: GS_BOLD,
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
  },
  room: {
    fontSize: 11,
    marginLeft: 5,
    marginTop: 20,
  },
  clockDate: {
    fontSize: 11,
    marginLeft: 5,
    marginTop: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
