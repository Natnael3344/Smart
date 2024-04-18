import { View, Text,Image, ImageBackground } from 'react-native'
import React from 'react'
import Background from '../../components/Background'
// import Photo from '../../assets/images/works.png'
import { ScrollView } from 'native-base'
const HowItWorks = () => {
  return (

      <ImageBackground resizeMode='center' source={Photo} style={{flex:1,backgroundColor:'#f0f5fb'}}>
      </ImageBackground>
      
      
  )
}

export default HowItWorks