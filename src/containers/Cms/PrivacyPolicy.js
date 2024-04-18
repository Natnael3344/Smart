import { View, Text } from 'react-native'
import React from 'react'
import { ScrollView } from 'native-base'
import Background from '../../components/Background'
import globalStyles from '../../assets/css/styles'
import { useSelector } from 'react-redux'
import { getLanguage } from '../../translations/languageSelector'
import en from '../../../locales/en.json';
import hi from '../../../locales/hi.json';
const PrivacyPolicy = () => {
  const language = useSelector(getLanguage);
  let translations;
  if (language.language === 'en') {
    translations = en;
  } else {
    translations = hi;
  }
  return (
    <Background showlogo={false}>
      <ScrollView style={{paddingHorizontal:20}}>
      <Text style={globalStyles.termsLargeText}>{translations.privacyPolicy.h1}</Text>
        <Text style={globalStyles.termsSmallText}>{translations.privacyPolicy.p1}</Text>
        <Text style={globalStyles.termsLargeText}>{translations.privacyPolicy.h2}</Text>
        <Text style={globalStyles.termsSmallText}>{translations.privacyPolicy.p2}</Text>
        <Text style={globalStyles.termsLargeText}>{translations.privacyPolicy.h3}</Text>
        <Text style={globalStyles.termsSmallText}>{translations.privacyPolicy.p3}</Text>
        <Text style={globalStyles.termsLargeText}>{translations.privacyPolicy.h4}</Text>
        <Text style={globalStyles.termsSmallText}>{translations.privacyPolicy.p4}</Text>
        <Text style={globalStyles.termsLargeText}>{translations.privacyPolicy.h5}</Text>
        <Text style={globalStyles.termsSmallText}>{translations.privacyPolicy.p5}</Text>
        <Text style={globalStyles.termsLargeText}>{translations.privacyPolicy.h6}</Text>
        <Text style={globalStyles.termsSmallText}>{translations.privacyPolicy.p6}</Text>
        <Text style={globalStyles.termsLargeText}>{translations.privacyPolicy.h7}</Text>
        <Text style={globalStyles.termsSmallText}>{translations.privacyPolicy.p7}</Text>
        <Text style={globalStyles.termsLargeText}>{translations.privacyPolicy.h8}</Text>
        <Text style={globalStyles.termsSmallText}>{translations.privacyPolicy.p8}</Text>
        <Text style={globalStyles.termsLargeText}>{translations.privacyPolicy.h9}</Text>
        <Text style={globalStyles.termsSmallText}>{translations.privacyPolicy.p9}</Text>
       </ScrollView>
    </Background>
  )
}

export default PrivacyPolicy