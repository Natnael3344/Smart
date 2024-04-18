// @ flow

import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
} from 'react-native';
import {LargeButton} from '../../../components/renderButton';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {OTPActions} from './OTP.actions';
import validate from '../../../config/Validator';
import globalStyles from '../../../assets/css/styles';
import CodeInput from 'react-native-confirmation-code-input';
//import TimerCountdown from "react-native-timer-countdown";
import ActivityLoading from '../../../components/loader/ActivityLoader';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Background from '../../../components/Background';
import LinearGradient from 'react-native-linear-gradient';
import {getLanguage} from '../../../translations/languageSelector';
import {useSelector, useDispatch} from 'react-redux';
import en from '../../../../locales/en.json';
import hi from '../../../../locales/hi.json';
class OtpScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      otpButton: 0,
      isSent: true,
      timer: 90,
      resendOTP: true,
    };
    this.SMSReadSubscription = {};
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  navigateToRegisterScreen = () => {
    this.props.navigation.navigate('Register');
  };
  navigateToDashboard= (code) => {
    console.log(this.props.user.data)
    if(this.props.user.data?.first_name!=''){
      _onSubmit(code)
    }else{
      this.props.navigation.navigate('RegisterName');
    }
    
  };
  _onSubmit = code => {
    let navigationParams = this.props.route.params;

    this.props.otp(code, navigationParams);
  };

  _resendOTP = () => {
    let navigationParams = this.props.route.params;


    if (typeof navigationParams.personal_mobile != undefined) {
      this.setState({timer: 90, resendOTP: false}, () => {
        this.interval = setInterval(() => {
          this.setState(
            prevState => ({timer: prevState.timer - 1}),
            () => {
              const {timer} = this.state;
              if (timer === 0) {
                clearInterval(this.interval);
                this.setState({resendOTP: true});
              }
            },
          );
        }, 1000);
      });
      this.props.resendOTP(navigationParams.personal_mobile);
    } else {
      navigation.navigate('Login');
    }

    this.refs.codeInputRef1.clear();
  };

  render() {
    const {handleSubmit, reset, submitting, language} = this.props;
    const {timer, resendOTP} = this.state;
    let translations;
    if (language.language === 'en') {
      translations = en;
    } else {
      translations = hi;
    }
    return (
      <Background>
        <View style={globalStyles.bigContainer}>
          <Text style={globalStyles.headerSmalltext}>
            {translations.welcome}
          </Text>
          <Text style={globalStyles.headerLargeText}>
            {translations.verification}
          </Text>
          <View style={globalStyles.smallContainer}>
            <Text style={globalStyles.bodyText}>{translations.code}</Text>
            <CodeInput
              keyboardType="numeric"
              ref="codeInputRef1"
              secureTextEntry={false}
              className={'border-b'}
              space={10}
              autoFocus={false}
              codeLength={6}
              size={50}
              activeColor="#000"
              inactiveColor="#000"
              containerStyle={{marginBottom: 60}}
              //a  className='border-box'
              inputPosition="center"
              onFulfill={code => this._onSubmit(code)}
              // inputPosition = 'center'
              codeInputStyle={globalStyles.codeInputStyle}
            />

            <Text style={globalStyles.bodyText}>{translations.noOtp}</Text>
            {resendOTP ? (
              <TouchableOpacity onPress={this._resendOTP}>
                <Text style={globalStyles.pressableText}>
                  {translations.resend}
                </Text>
              </TouchableOpacity>
            ) : (
              <Text
                style={{
                  alignSelf: 'center',
                }}>{`${translations.resend} ${timer}s`}</Text>
            )}
          </View>
        </View>
      </Background>
    );
  }
}

const mapStateToPros = state => {
  return {
    user: state.login.user.data,
    loading: state.otp.loading,
    otpState: state.otp.user,
    language: getLanguage(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    otp: (otp, user_id) => dispatch(OTPActions.OTP(otp, user_id)),
    resendOTP: mobile_number => dispatch(OTPActions.resendOTP(mobile_number)),
  };
};

OtpScreen = connect(mapStateToPros, mapDispatchToProps)(OtpScreen);

export default reduxForm({
  form: 'OtpScreen',
  validate,
})(OtpScreen);
