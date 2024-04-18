import React, {useEffect, useState} from 'react';
import {
  Keyboard,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Switch
} from 'react-native';
import { loginActions } from './Login.actions';
import validate from '../../../config/Validator';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { renderTextField } from '../../../components/renderInput';
import Background from '../../../components/Background';
import globalStyles from '../../../assets/css/styles';
import { LargeButton } from '../../../components/renderButton';
import { useSelector,useDispatch } from 'react-redux';
import { getLanguage } from '../../../translations/languageSelector';
import en from '../../../../locales/en.json';
import hi from '../../../../locales/hi.json';
import { OTPActions } from '../OTP/OTP.actions';
import LinearGradient from 'react-native-linear-gradient';
const LoginScreen = (props) => {

  const { handleSubmit, reset, submitting,navigation } = props;
  const [rememberMe, setRememberMe] = useState(false);
  

  navigateToRegisterScreen = () => {
    
      navigation.navigate("Register");
    
  }
  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
  };
  _onSubmit = (values) => {
    Keyboard.dismiss()
    props.login(values)
  }
  const language = useSelector(getLanguage);
  let translations;
  if (language.language === 'en') {
    translations = en;
  } else {
    translations = hi;
  }
  return( 
    <Background>
      <LinearGradient
        colors={['rgba(3,3,3,255)', 'rgba(10,10,10,255)']}
        start={{ x: 0.3, y: 0.3 }}
        end={{ x: 1, y: 1 }}
        angle={123.64}
        style={globalStyles.bigContainer}>
          <Text style={globalStyles.headerLargeText}>Nice to see you!</Text>
          <Text style={globalStyles.headerSmalltext}>Enter your email and password to sign in</Text>
          
         
            <Text style={globalStyles.bodyText}>Email</Text>
            <Field
                name="email"
                label="Your email address"                              
                inputStyle={globalStyles.AuthTextInput}
                component={renderTextField}
                keyboardType={'phone-pad'}
              />
            <Text style={globalStyles.bodyText}>Password</Text>
            <Field
                name="password"
                label="Your password"                              
                inputStyle={globalStyles.AuthTextInput}
                component={renderTextField}
                keyboardType={'phone-pad'}
              />
              <View style={globalStyles.rememberMeContainer}>
              <Switch value={rememberMe} onValueChange={toggleRememberMe} trackColor={{ false: 'white', true: 'rgba(0, 117, 255, 1)' }} thumbColor="white" />
              <Text style={globalStyles.bodyText1}>Remember me</Text>
          
        </View>
            <LargeButton title={'SIGN IN'} style={globalStyles.gradientButton} onPressEvent={handleSubmit(this._onSubmit)} />
       
          
      </LinearGradient>
    </Background>
);
}


const mapStateToPros = (state) => {
  return ({ 
      user: state.login,
      loading : state.login.loading,
  })
}

const mapDispatchToProps = (dispatch) => {
  return {
      login: (values) => dispatch(loginActions.login(values)),
      socialLogin : (socialData,data) => dispatch(loginActions.socialLogin(socialData,data)),
     
  }
}

Login = connect(
  mapStateToPros,
  mapDispatchToProps
)(LoginScreen)



export default reduxForm({
  form: 'Login',
  validate
})(Login);


