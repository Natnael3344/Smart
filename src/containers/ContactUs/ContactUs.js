import React from 'react';
import {View, Text, TouchableOpacity, Linking} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Background from '../../components/Background';
import { useSelector } from 'react-redux';
import { getLanguage } from '../../translations/languageSelector';
import en from '../../../locales/en.json';
import hi from '../../../locales/hi.json';
const emailAddress = 'surakshachakra@myambar.org';

const socialMediaLinks = {
  facebook: 'https://www.facebook.com/marthafarrellfoundation',
  twitter: 'https://twitter.com/FoundationMf',
  youtube: 'https://www.youtube.com/channel/UCMK2xQa7G1V23iDT5DaPNSA',
  linkedin: 'https://www.linkedin.com/company/martha-farrell-foundation/',
};
const ContactUs = () => {
  const language = useSelector(getLanguage);
  let translations;
  if (language.language === 'en') {
    translations = en;
  } else {
    translations = hi;
  }
  handleEmailPress = () => {
    console.log('handleEmailPress');
    Linking.openURL(`mailto:${emailAddress}`);
  };

  handleSocialMediaPress = platform => {
    //console.log("comehere",platform);
    Linking.openURL(socialMediaLinks[platform]);
  };

  return (
    <Background showlogo={false}>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          top: 50,
        }}>
        <Text
          style={{
            fontSize: 22,
            fontWeight: 'bold',
            color: 'black',
            marginBottom: 20,
          }}>
          {translations.contact}
        </Text>
        <TouchableOpacity onPress={handleEmailPress}>
          <Text style={{fontSize: 17, color: 'black'}}>
            {translations.email} {emailAddress}
          </Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row', marginTop: 20}}>
          <TouchableOpacity
            style={{marginRight: 40}}
            onPress={() => handleSocialMediaPress('facebook')}>
            <Icon name="facebook-square" size={40} color={'blue'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginRight: 40}}
            onPress={() => handleSocialMediaPress('twitter')}>
            <Icon name="twitter" size={40} color={'#00acee'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginRight: 40}}
            onPress={() => handleSocialMediaPress('youtube')}>
            <Icon name="youtube" size={40} color={'red'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSocialMediaPress('linkedin')}>
            <Icon name="linkedin-square" size={40} color={'#0e76a8'} />
          </TouchableOpacity>
        </View>
      </View>
    </Background>
  );
};

export default ContactUs;
