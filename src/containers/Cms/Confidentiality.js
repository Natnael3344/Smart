import { View, Text } from 'react-native'
import React from 'react'
import { ScrollView } from 'native-base'
import Background from '../../components/Background'
import globalStyles from '../../assets/css/styles'
import en from '../../../locales/en.json';
import hi from '../../../locales/hi.json';
import { useSelector } from 'react-redux'
import { getLanguage } from '../../translations/languageSelector'
const Confidentiality = () => {
  const language = useSelector(getLanguage);
  let translations;
  if (language.language === 'en') {
    translations = en;
  } else {
    translations = hi;
  }
  return (
    <Background showlogo={false}>
      <View style={{paddingHorizontal:20}}>
      <Text style={globalStyles.termsSmallText}>{translations.Confidentiality.p}</Text>
      </View>
      </Background>
  )
}

export default Confidentiality