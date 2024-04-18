import React, {useEffect, useState} from 'react';
import {
  Keyboard,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Switch,
  Dimensions,
} from 'react-native';
import { registrationActions } from './Registration.actions';
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
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
const windowHeight = Dimensions.get('window').height;
const RegistrationScreen = (props) => {

  const { handleSubmit, navigation } = props;
  const [rememberMe, setRememberMe] = useState(false);
  navigateToLoginScreen = () => {
    navigation.navigate("Login");
  }

  _onSubmit = (values) => {
    Keyboard.dismiss()
    props.registration(values)
  }
  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
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
        
        <Text style={globalStyles.headerLargeText1}>Welcome!</Text>
      
      <LinearGradient
        colors={['rgba(3,3,3,255)', 'rgba(10,10,10,255)']}
        start={{ x: 0.3, y: 0.3 }}
        end={{ x: 1, y: 1 }}
        angle={123.64}
        style={globalStyles.bigContainer}>
          <Text style={globalStyles.headerSmalltext1}>Register with</Text>
          <View style={{alignSelf:'center',justifyContent:'space-between',flexDirection:'row',width:0.16*windowHeight,}}>
            <View style={{width:0.067*windowHeight,height:0.067*windowHeight,justifyContent:'center',alignItems:'center',borderWidth:0.51,borderRadius:10,borderColor:'rgba(255, 255, 255, 1)'}}>
            <Ionicons name="logo-facebook" size={0.023*windowHeight} color={"white"}/>
            </View>
            <View style={{width:0.067*windowHeight,height:0.067*windowHeight,justifyContent:'center',alignItems:'center',borderWidth:0.51,borderRadius:10,borderColor:'rgba(255, 255, 255, 1)'}}>
          <Ionicons name="logo-google" size={0.023*windowHeight} color={"white"}/>
          </View>
          </View>
          <Text style={globalStyles.headerSmalltext1}>or</Text>
          <Text style={globalStyles.bodyText}>Name</Text>
            <Field
                name="name"
                label="Your full name"                              
                inputStyle={globalStyles.AuthTextInput}
                component={renderTextField}
                keyboardType={'phone-pad'}
              />
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
            <LargeButton title={'SIGN UP'} style={globalStyles.gradientButton} onPressEvent={handleSubmit(this._onSubmit)} />
            <View style={{flexDirection:'row',justifyContent:'center',marginTop:0.012*windowHeight}}>
              <Text style={globalStyles.bodyText2}>Already have an account? </Text>
               <TouchableOpacity onPress={navigateToLoginScreen}>
                   <Text style={globalStyles.pressableText}>Sign in</Text>
                </TouchableOpacity>
                </View>          
      </LinearGradient>
     
    </Background>
);
}


const mapStateToPros = (state) => {
  return ({ 
      user: state.registration 
  })
}

const mapDispatchToProps = (dispatch) => {
  return {
      registration: (values) => dispatch(registrationActions.registration(values)),
  }
}

Registration = connect(
  mapStateToPros,
  mapDispatchToProps
)(RegistrationScreen)



export default reduxForm({
  form: 'Registration',
  validate
})(Registration);


