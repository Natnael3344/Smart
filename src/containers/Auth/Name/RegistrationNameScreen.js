import React, {useEffect} from 'react';
import {
  Keyboard,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import {registrationNameActions } from './RegistrationName.actions';
import validate from '../../../config/Validator';
import { Field, reduxForm } from 'redux-form';
import { connect, useSelector } from 'react-redux';
import { renderTextField } from '../../../components/renderInput';
import Background from '../../../components/Background';
import globalStyles from '../../../assets/css/styles';
import { LargeButton } from '../../../components/renderButton';
import { getLanguage } from '../../../translations/languageSelector';
import en from '../../../../locales/en.json';
import hi from '../../../../locales/hi.json';
const RegistrationNameScreen = (props) => {

  const { handleSubmit, navigation } = props;

  navigateToLoginScreen = () => {
    navigation.navigate("Login");
  }

  // _onSubmit = (values) => {
  //   Keyboard.dismiss()
  //   props.registration(values)
  // }
  _onSubmit = (code,values) => {
    Keyboard.dismiss()
    props.registrationName(values)
    let navigationParams = props.route.params;
    props.otp(code, navigationParams);
  };

  const language = useSelector(getLanguage);
  let translations;
  if (language.language === 'en') {
    translations = en;
  } else {
    translations = hi;
  }
  return( 
    <Background>
      <View style={[globalStyles.bigContainer]}>
     
          <Text style={globalStyles.headerSmalltext}>{translations.welcome}</Text>
          <Text style={globalStyles.headerLargeText}>{translations.createAccount}</Text>
          <View style={globalStyles.smallContainer}>
          <View style={{height:'66%'}}>
      <ScrollView>
          <Text style={globalStyles.bodyText}>{translations.first}</Text>
            <Field
                name="first_name"
                label="First Name *"                              
                inputStyle={globalStyles.AuthTextInput}
                component={renderTextField}
              />
              <Text style={globalStyles.bodyText}>{translations.last}</Text>
            <Field
                name="last_name"
                label="Last Name *"                              
                inputStyle={globalStyles.AuthTextInput}
                component={renderTextField}
              />
           
                </ScrollView>
          </View>
            <LargeButton title={translations.otp} style={globalStyles.gradientButton} onPressEvent={handleSubmit(this._onSubmit)} />
            
          </View>
        
      </View>
    </Background>
);
}


const mapStateToPros = (state) => {
  return ({ 
      user: state.registrationName 
  })
}

const mapDispatchToProps = (dispatch) => {
  return {
      registrationName: (values) => dispatch(registrationNameActions.registration(values)),
  }
}

RegistrationName = connect(
  mapStateToPros,
  mapDispatchToProps
)(RegistrationNameScreen)



export default reduxForm({
  form: 'RegistrationName',
  validate
})(RegistrationName);


