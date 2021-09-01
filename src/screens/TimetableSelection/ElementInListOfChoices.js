import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

const ElementInListOfChoices = props => {
  return (
    <Pressable
      onPress={props.onPress}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? '#EFEFEF' : 'transparent',
        },
      ]}
    >
      <Text style={styles.options}>{props.post}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  options: {
    fontFamily: 'gs-regular',
    fontSize: 14,
    paddingVertical: 17,
    paddingHorizontal: 21,
  },
});

export default ElementInListOfChoices;
