import React from 'react';
import { Text, Pressable, StyleSheet, View } from 'react-native';
import ShowListOfChoicesIcon from '../../../../assets/svg/nav-arrow.svg';

const SelectionScreenLayout = props => {
  return (
    <>
      <Text style={styles.heading}>{props.heading}</Text>
      <Pressable
        style={styles.chooseOneBox}
        onPress={() => props.setVisible(true)}
        disabled={props.disabled}
      >
        <View
          style={{
            width: '90%',
          }}
        >
          <Text
            numberOfLines={1}
            style={
              props.value === null
                ? props.disabled
                  ? {
                      fontFamily: 'gs-regular-italic',
                      fontSize: 14,
                      opacity: 0.2,
                    }
                  : {
                      fontFamily: 'gs-regular-italic',
                      fontSize: 14,
                    }
                : { fontFamily: 'gs-regular', fontSize: 14 }
            }
          >
            {props.value || props.placeholder}
          </Text>
        </View>
        <ShowListOfChoicesIcon
          style={
            props.disabled
              ? [styles.showListOfChoicesIcon, { opacity: 0.35 }]
              : styles.showListOfChoicesIcon
          }
        />
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontFamily: 'gs-bold',
    fontSize: 14,
    marginTop: 30,
  },
  chooseOneBox: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 38,
    marginTop: 15,
    backgroundColor: 'white',
    paddingLeft: 10,
    paddingRight: 10.84,
  },
  showListOfChoicesIcon: {
    transform: [{ rotateZ: '270deg' }],
  },
});

export default SelectionScreenLayout;
