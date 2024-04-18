import React from 'react';
import { connect, useSelector } from 'react-redux';
import {Image, View, Text, Alert,TouchableOpacity} from 'react-native';

import { OTPActions } from "../containers/Auth/OTP/OTP.actions";
import DrawerFooterStyle from './DrawerFooterStyle';
import CustomButton from '../components/CustomButton';
import { DrawerActions } from '@react-navigation/native';
import { getLanguage } from '../translations/languageSelector';
import en from '../../locales/en.json';
import hi from '../../locales/hi.json';
const DrawerFooter = props => {
  const language = useSelector(getLanguage);
  let translations;
  if (language.language === 'en') {
    translations = en;
  } else {
    translations = hi;
  }
  return (
    <View style={DrawerFooterStyle.component}>
      <View style={{paddingHorizontal: 20}}>
        <CustomButton
          text={translations.logout}
          onPress={() =>
            Alert.alert(
              translations.logout,
              translations.alert,
              [
                {
                  text: translations.cancel,
                  onPress: () => {
                    props.navigation.dispatch(DrawerActions.closeDrawer());
                  },
                },
                {
                  text: translations.confirm,
                  onPress: () => props.logoutUser(),
                },
              ],
              {cancelable: false},
            )
          }
        />
      </View>
      <Text style={DrawerFooterStyle.RightsTextStyle}>
        {translations.rights}
      </Text>
    </View>
  );
};



const mapStateToPros = (state) => {
  return ({ 
      user : state.otp.user,
      loading : state.otp.loading 
  })
}

const mapDispatchToProps = (dispatch) => {
  return {
      logoutUser: (values) => dispatch(OTPActions.logout()),
    
  }
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(DrawerFooter)
