import { View, Text } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import globalStyles from '../assets/css/styles';
const AppHeader = ({text}) => {
  return (
    <View
          style={globalStyles.headerContainer}>
          <AntDesign name="arrowleft" size={45} color="black" />
          <Text
            style={globalStyles.headerText}>
            {text}
          </Text>
          <Feather name="menu" size={45} color="black" />
        </View>
  )
}

export default AppHeader