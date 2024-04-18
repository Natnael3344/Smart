import React,{Component} from 'react';
import {View, TouchableOpacity, TouchableNativeFeedback, Platform, Dimensions} from 'react-native';
import { Icon, Row, Col, Text } from 'native-base';
import { responsiveHeight, responsiveWidth, responsiveFontSize} from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';
import globalStyles from '../assets/css/styles';
const windowHeight = Dimensions.get('window').height;
const GradientBtn = ({ name, gradientStyle, gradientTextStyle }) => (
   
  <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor:'rgba(0, 117, 255, 1)'
      }}>  
    <Text style={{
    fontSize: 0.015*windowHeight,
    color: 'white',
    fontWeight:'600',
    alignSelf: 'center',
  }}>{name}</Text>
  </View>
)

export const SmallButton = (props) => {
	
  let TouchablePlatformSpecific = Platform.OS === 'ios' ? 
  TouchableOpacity : 
  TouchableOpacity;

  let buttonTitle			=	typeof props.title != 'undefined' ? props.title : '';
  let buttonStyle			=	typeof props.style != 'undefined' ? props.style : '';

  return (
  <TouchablePlatformSpecific style={[buttonStyle]} onPress={props.onPressEvent}>
  <GradientBtn name={buttonTitle} gredientStyle={[globalStyles.gradientRound]} gradientTextStyle={globalStyles.buttonSmallCenterText}/>
  </TouchablePlatformSpecific>
  );
}

export const mediumButton = (props) => {
	
  let TouchablePlatformSpecific = Platform.OS === 'ios' ? 
       TouchableOpacity : 
       TouchableOpacity;
    
  let buttonTitle			=	typeof props.title != 'undefined' ? props.title : '';
  let buttonStyle			=	typeof props.style != 'undefined' ? props.style : '';
 
   return (
   <TouchablePlatformSpecific style={[buttonStyle]} onPress={props.onPressEvent}>
     <GradientBtn name={buttonTitle} gredientStyle={[globalStyles.gradientRound]} gradientTextStyle={globalStyles.buttonSmallCenterText}/>
   </TouchablePlatformSpecific>
   );
}

export const LargeButton = (props) => {
	
  let TouchablePlatformSpecific = Platform.OS === 'ios' ? 
       TouchableOpacity : 
       TouchableOpacity;
    
  let buttonTitle			=	typeof props.title != 'undefined' ? props.title : '';
  let buttonStyle			=	typeof props.style != 'undefined' ? props.style : '';
 
   return (
   <TouchablePlatformSpecific style={[buttonStyle]} onPress={props.onPressEvent}>
     <GradientBtn name={buttonTitle} gredientStyle={[globalStyles.gradientRound]} gradientTextStyle={globalStyles.buttonSmallCenterText}/>
   </TouchablePlatformSpecific>
   );
}

