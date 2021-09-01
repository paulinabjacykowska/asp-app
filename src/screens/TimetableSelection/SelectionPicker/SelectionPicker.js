import ListOfChoicesModal from './ListOfChoicesModal';
import SelectionScreenLayout from './SelectionScreenLayout';
import React, { useState } from 'react';
import ElementInListOfChoices from '../ElementInListOfChoices';
import HideListOfChoicesIcon from '../../../../assets/svg/nav-arrow.svg';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';

const SelectionPicker = props => {
  const [visible, setVisible] = useState(false);

  return (
    <View>
      <ListOfChoicesModal visible={visible} onChangeVisible={setVisible}>
        <View style={{ paddingHorizontal: 21 }}>
          <Pressable
            style={styles.listOfChoicesTitle}
            onPress={() => setVisible(false)}
          >
            <Text style={styles.listOfChoicesElements}>{props.title}</Text>
            <HideListOfChoicesIcon style={styles.hideListOfChoicesIcon} />
          </Pressable>
        </View>
        <ScrollView
          style={{ maxHeight: 430, marginBottom: 17.5 }}
          showsVerticalScrollIndicator={false}
        >
          {props.items.map(item => (
            <ElementInListOfChoices
              key={item.label}
              post={item.label}
              onPress={() => {
                setVisible(false);
                props.onChangeValue(item.label);
              }}
            />
          ))}
        </ScrollView>
      </ListOfChoicesModal>
      <SelectionScreenLayout
        heading={props.heading}
        disabled={props.disabled}
        value={props.value}
        placeholder={props.title}
        setVisible={visible => setVisible(visible)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listOfChoicesTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 17,
  },
  listOfChoicesElements: {
    fontFamily: 'gs-regular-italic',
    fontSize: 14,
  },
  hideListOfChoicesIcon: {
    transform: [{ rotateZ: '90deg' }],
  },
});

export default SelectionPicker;
