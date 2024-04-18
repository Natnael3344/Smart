import {View, Text, Image, Pressable, Dimensions} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import globalStyles from '../assets/css/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const windowHeight = Dimensions.get('window').height;
const CustomCard = ({text,text1,text2,name, onCustomPress}) => {
  return (
    <Pressable style={globalStyles.card} onPress={onCustomPress}>
      <View>
        <View style={{flexDirection:'row'}}>
         <View style={{backgroundColor:'rgba(0, 117, 255, 1)',width:0.031*windowHeight,height:0.031*windowHeight,borderRadius:7,alignItems:'center',justifyContent:'center'}}>
         <MaterialIcons
            name={name}
            size={0.02*windowHeight}
            color="white"
          />
          </View> 
          <Text style={globalStyles.cardText}>{text}</Text>
        </View>
        <Text style={globalStyles.cardText1}>{text1}</Text>
        <Text style={globalStyles.cardText2}>{text2}</Text>
      </View>
      
      
    </Pressable>
  );
};

export default CustomCard;
