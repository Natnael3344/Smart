import { View, Text, Pressable} from 'react-native'
import React from 'react'
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import globalStyles from '../assets/css/styles';
import { useSelector } from 'react-redux';
import { getLanguage } from '../translations/languageSelector';
import en from '../../locales/en.json';
import hi from '../../locales/hi.json';
const TrackCustomCard = ({item,onPress}) => {
  const language = useSelector(getLanguage);
  let translations;
  if (language.language === 'en') {
    translations = en;
  } else {
    translations = hi;
  }
  let icon;
  let iconColor;
  if(item?.status === 'Solved')
  {
    icon = 'check-circle-outline';
    iconColor = 'green';
  }
  else if(item?.status === 'Rejected'){
    icon = 'cancel';
    iconColor = 'red';
  }
  else{
    icon = 'pending-actions';
    iconColor = '#b6a24c';
  }
  return (
    <View>
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <View style={{flexDirection:'row',alignItems:'center',marginLeft:20}}> 
      <EvilIcons name="calendar" size={40} color="white" style={{alignSelf:'center'}}/>
      <Text style={globalStyles.calendarText}>{item?.created_at}</Text>
        </View>
        </View>
        <View style={globalStyles.trackContainerSmall}>
        <View style={globalStyles.row}>
        <Text style={globalStyles.label}>{translations.case}</Text>
        <Text style={globalStyles.value}>{item?.case_id}</Text>
      </View>
      <View style={globalStyles.row}>
        <Text style={globalStyles.label}>{translations.name}</Text>
        <Text style={globalStyles.value}>{item?.full_name}</Text>
      </View>
     
      <View style={globalStyles.row}>
        <Text style={globalStyles.label}>{translations.status}</Text>
        <Text style={[globalStyles.value,{color : iconColor}]}>{item?.status}</Text>
        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
        <Pressable onPress={onPress}>
        <FontAwesome5 name="download" size={25} color="black" style={{alignSelf:'center',marginRight:20}}/>
        </Pressable>
        <MaterialIcons name={icon} size={30} color={iconColor}/>
        </View>
        
      </View>
        </View>
    </View>
  )
}

export default TrackCustomCard