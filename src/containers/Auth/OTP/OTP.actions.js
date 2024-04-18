// @ flow

import React from 'react';
import {OTPService} from './OTP.services';
import {stopSubmit} from 'redux-form';
import {SuccesToaster, ErrorToaster} from '../../../helpers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RootNavigation from '../../../navigation/RootNavigation';
import {CommonActionsCreator} from '../../../actions/CommonActionCreators';
import { storeData } from '../../../api/asyncStorage';

export const OTPActions = {
  OTP,
  resendOTP,
  logout,
};

/* ---- Action Types ---- */

export const OTPConstants = {
  OTP_REQUEST: 'USERS_OTP_REQUEST',
  OTP_SUCCESS: 'USERS_OTP_SUCCESS',
  OTP_UPDATE: 'USERS_OTP_UPDATE',
  OTP_FAILURE: 'USERS_OTP_FAILURE',
  OTP_RESEND: 'USERS_OTP_RESEND',
  LOGOUT_REQUEST: 'LOGOUT_REQUEST',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
  LOGOUT_FAILURE: 'LOGOUT_FAILURE',
};

/* ---- OTP Verify Function Start ---- */
function OTP(otp, pdata) {
  return dispatch => {
    dispatch(CommonActionsCreator.fetching(OTPConstants.OTP_REQUEST));

    OTPService.OTP(otp, pdata).then(
      user => {
        if (user.status_code === 200) {
          dispatch(
            CommonActionsCreator.success(OTPConstants.OTP_SUCCESS, user),
          );

           storeData("access_token",user.data[0].token);
           storeData("login_data",user.data[0], true);
          const successMessage = user.message;

          RootNavigation.navigate('dashboard');
          SuccesToaster({otp: otp}, successMessage);
        } else {
          dispatch(CommonActionsCreator.error(OTPConstants.OTP_FAILURE, user));

          const validationErrors = {otp: user.message};
          ErrorToaster('', user.message);
          dispatch(stopSubmit('OtpScreen', validationErrors));
        }
      },
      error => {
        ErrorToaster(' Alert ', 'Something went wrong !!!');
      },
    );
  };
}
/* ---- OTP Verify Function Ends ---- */

/* ---- OTP Verify Function Starts ---- */

function resendOTP(phonenumber) {
  return dispatch => {
    dispatch(CommonActionsCreator.fetching(OTPConstants.OTP_REQUEST));

    OTPService.resendOTP(phonenumber).then(
      user => {
        if (user.status_code === 200) {
          dispatch(CommonActionsCreator.success(OTPConstants.OTP_RESEND, user));

          const successMessage = user.message;
          const param = {};

          SuccesToaster(param, successMessage);
        } else {
          ErrorToaster(' Alert ', 'Something went wrong !!!');
        }
      },
      error => {
        ErrorToaster(' Alert ', 'Something went wrong !!!');
      },
    );
  };
}

/*----- Logout Function Start  ------*/
function logout(data) {
  return dispatch => {
    console.log('---come here---');
    AsyncStorage.clear();
   // NavigationService.navigate('Login');
    dispatch(CommonActionsCreator.success(OTPConstants.LOGOUT_SUCCESS));
  };

}
/*----- Logout function End  ----*/
