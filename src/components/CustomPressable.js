import {View, Text, Pressable, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import {color} from 'react-native-reanimated';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import globalStyles from '../assets/css/styles';
import {COLOR} from '../constants/GlobalConstants';
const {width, height} = Dimensions.get('window');
const CustomPressable = ({onPress, text, text1, name}) => {
  return (
    <View style={globalStyles.buttonContainer}>
      <View
        style={{
          width: 20,
          height: height * 0.1,
          backgroundColor: COLOR.BACKGROUND_COLOR,
          
          // marginRight: 20,
        }}></View>
      <View style={globalStyles.buttonContainer1}>
        <Text style={globalStyles.buttonText}>{text}</Text>
      </View>
      <Pressable onPress={onPress} >
        <MaterialIcons name={name} size={30} color={COLOR.BACKGROUND_COLOR} />
      </Pressable>
    </View>
  );
};

export default CustomPressable;
