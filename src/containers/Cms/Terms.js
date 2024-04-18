import { View, Text } from 'react-native'
import React from 'react'
import { ScrollView } from 'native-base'
import Background from '../../components/Background'
import globalStyles from '../../assets/css/styles'
import { useSelector } from 'react-redux'
import { getLanguage } from '../../translations/languageSelector'
import en from '../../../locales/en.json';
import hi from '../../../locales/hi.json';
const Terms = () => {
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
      <Text style={globalStyles.termsSmallText}>{translations.termsOfUse.top_para}</Text>
<Text style={globalStyles.termsSmallText}>{translations.termsOfUse.b1}</Text>
<Text style={globalStyles.termsLargeText}>{translations.termsOfUse.h1}</Text>
<Text style={globalStyles.termsSmallText}>{translations.termsOfUse.p1}</Text>
<Text style={globalStyles.termsLargeText}>{translations.termsOfUse.h2}</Text>
<Text style={globalStyles.termsSmallText}>{translations.termsOfUse.p2v1}</Text>
<Text style={globalStyles.termsSmallText}>{translations.termsOfUse.p2v2}</Text>
<Text style={globalStyles.termsLargeText}>{translations.termsOfUse.h3}</Text>
<Text style={globalStyles.termsSmallText}>{translations.termsOfUse.p3}</Text>
<Text style={globalStyles.termsLargeText}>{translations.termsOfUse.h4}</Text>
<Text style={globalStyles.termsSmallText}>{translations.termsOfUse.p4v1}</Text>
<Text style={globalStyles.termsSmallText}>{translations.termsOfUse.p4v2}</Text>
<Text style={globalStyles.termsLargeText}>{translations.termsOfUse.h5}</Text>
<Text style={globalStyles.termsSmallText}>{translations.termsOfUse.p5v1}</Text>
<Text style={globalStyles.termsSmallText}>{translations.termsOfUse.p5v2}</Text>
<Text style={globalStyles.termsSmallText}>{translations.termsOfUse.p5v3}</Text>
<Text style={globalStyles.termsSmallText}>{translations.termsOfUse.p5v4}</Text>
<Text style={globalStyles.termsSmallText}>{translations.termsOfUse.p5v5}</Text>
<Text style={globalStyles.termsSmallText}>{translations.termsOfUse.p5v6}</Text>
<Text style={globalStyles.termsSmallText}>{translations.termsOfUse.p5v7}</Text>
<Text style={globalStyles.termsSmallText}>{translations.termsOfUse.p5v8}</Text>
<Text style={globalStyles.termsSmallText}>{translations.termsOfUse.p5v9}</Text>
<Text style={globalStyles.termsLargeText}>{translations.termsOfUse.h6}</Text>
<Text style={globalStyles.termsSmallText}>{translations.termsOfUse.p6v1}</Text>
<Text style={globalStyles.termsSmallText}>{translations.termsOfUse.p6v2}</Text>
<Text style={globalStyles.termsSmallText}>{translations.termsOfUse.p6v3}</Text>
<Text style={globalStyles.termsLargeText}>{translations.termsOfUse.h7}</Text>
<Text style={globalStyles.termsSmallText}>{translations.termsOfUse.p7v1}</Text>
<Text style={globalStyles.termsSmallText}>{translations.termsOfUse.p7v2}</Text>
<Text style={globalStyles.termsSmallText}>{translations.termsOfUse.p7v3}</Text>
<Text style={globalStyles.termsSmallText}>{translations.termsOfUse.p7v4}</Text>
<Text style={globalStyles.termsLargeText}>{translations.termsOfUse.h8}</Text>
<Text style={globalStyles.termsSmallText}>{translations.termsOfUse.p8}</Text>
<Text style={globalStyles.termsLargeText}>{translations.termsOfUse.h9}</Text>
<Text style={globalStyles.termsSmallText}>{translations.termsOfUse.p9}</Text>
<Text style={globalStyles.termsLargeText}>{translations.termsOfUse.h10}</Text>
<Text style={globalStyles.termsSmallText}>{translations.termsOfUse.p10v1}</Text>
<Text style={globalStyles.termsSmallText}>{translations.termsOfUse.p10v2}</Text>
      </ScrollView>
    </Background>
  )
}

export default Terms