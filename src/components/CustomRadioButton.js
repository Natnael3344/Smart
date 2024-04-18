import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

import { RadioButton} from 'react-native-paper';
import { COLOR } from '../constants/GlobalConstants';
import { getLanguage } from '../translations/languageSelector';
import { useSelector } from 'react-redux';
import en from '../../locales/en.json';
import hi from '../../locales/hi.json';
const CustomRadioButton = ({toggleSwitch, isSwitchOn}) => {
  const language = useSelector(getLanguage);
  let translations;
  if (language.language === 'en') {
    translations = en;
  } else {
    translations = hi;
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.optionButton, isSwitchOn ? styles.activeButton : styles.inactiveButton]}
        onPress={toggleSwitch}
      >
        <Text style={[styles.buttonText1, isSwitchOn ? styles.activeText : styles.inactiveText]}>{translations.yes}</Text>
       </TouchableOpacity>
      <TouchableOpacity
        style={[styles.optionButton, !isSwitchOn ? styles.activeButton : styles.inactiveButton]}
        onPress={toggleSwitch}
      >
        <Text style={[styles.buttonText, isSwitchOn ? styles.activeText : styles.inactiveText]}>{translations.no}</Text>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor:'black',
      width:100,
      marginVertical:20,
      justifyContent:'space-evenly'
    },
    optionButton: {
      paddingHorizontal:10,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
    },
    activeButton: {
      backgroundColor: COLOR.BACKGROUND_COLOR,
    },
    inactiveButton: {
      backgroundColor: 'black',
    },
    buttonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#fff',
    },
    buttonText1: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
      },
    activeText: {
      color: '#fff',
    },
    inactiveText: {
      color: '#fff',
    },
  });
export default CustomRadioButton