
// @ flow

import React from 'react';
import { loginService } from './Login.services';

import { stopSubmit } from 'redux-form';
import { SuccesToaster, ErrorToaster } from '../../../helpers';
import { OTPConstants } from '../OTP/OTP.actions'
import * as RootNavigation from '../../../navigation/RootNavigation';
import { CommonActionsCreator } from '../../../actions/CommonActionCreators';


export const loginActions = {
    login,
    loginWithPassword,
    socialLogin
};

/* ---- Action Types ---- */

export const loginConstants = {
    LOGIN_REQUEST: 'USERS_LOGIN_REQUEST',
    LOGIN_SUCCESS: 'USERS_LOGIN_SUCCESS',
    LOGIN_FAILURE: 'USERS_LOGIN_FAILURE'
};

/* ---- Login Function Start ---- */
function login(pdata) {


    return (dispatch) => {

        dispatch(CommonActionsCreator.fetching(loginConstants.LOGIN_REQUEST));
        
    
        loginService.login(pdata)
            .then(
                user => {    
               
                     if (user.status_code === 200) {
                        dispatch(CommonActionsCreator.success(loginConstants.LOGIN_SUCCESS, user));
                        const successMessage = user.message;
                    
                        RootNavigation.navigate("Otp",{'personal_mobile':pdata.username})
                        SuccesToaster({phonenumber:pdata.username}, successMessage);

                    } else {
                        dispatch(CommonActionsCreator.error(loginConstants.LOGIN_FAILURE, user))

                        let msg     =   '';
                        if(typeof user.message[0].msg  != 'undefined')
                        {
                            msg     =   user.message[0].msg;
                        }
                        else{
                            msg     =   user.message;
                        }
                    
                        const validationErrors = { perosnal_mobile: msg };
                        dispatch(stopSubmit('Login', validationErrors));
                    }
                },
                error => {
                   
                    ErrorToaster(" Alert ", "Something went wrong !!!");                  
                }
            );
    };
}
/* ---- Login Function Ends ---- */


/* ---- Login Function Start ---- */
function loginWithPassword(username) {
    return (dispatch) => {

        dispatch(CommonActionsCreator.fetching(loginConstants.LOGIN_REQUEST));

        loginService.loginWithPassword(username)
            .then(
                user => {    
                    if (user.data.status === "success") {
                        dispatch(CommonActionsCreator.success(loginConstants.LOGIN_SUCCESS, user));
                        dispatch(CommonActionsCreator.success(OTPConstants.OTP_SUCCESS, user));
                        const successMessage = user.message;
                        const param = {};
                        NavigationService.navigate("Home");
                        SuccesToaster(param, 'Welcome to My Ambar!');

                    } else {
                        dispatch(CommonActionsCreator.error(loginConstants.LOGIN_FAILURE, user))
                     
                        let msg     =   '';
                        if(typeof user.message  != 'undefined')
                        {
                            msg     =   user.message;
                        }
                        else{
                            msg     =   user.message;
                        }

                        const validationErrors = { user_name: msg };
                        dispatch(stopSubmit('LoginWithPassword', validationErrors));
                    }
                },
                error => {
                   
                    ErrorToaster(" Alert ", "Something went wrong !!!");                  
                }
            );
    };
}
/* ---- Login Function Ends ---- */


/* ---- Socail Login Function Start ---- */
function socialLogin(socialData,registerData) {
    return (dispatch) => {
        dispatch(CommonActionsCreator.fetching(loginConstants.LOGIN_REQUEST));
        loginService.socialLogin(socialData)
            .then(
                user => {
                 
                    if (user.data.status === "success") {
                        dispatch(CommonActionsCreator.success(loginConstants.LOGIN_SUCCESS, user));
                        if(user.data.is_register == 0){
                            RootNavigation.navigate("Register",registerData);
                        }else{
                            dispatch(CommonActionsCreator.success(OTPConstants.OTP_SUCCESS, user));
                            const successMessage = user.message;
                            const param = {};
                            NavigationService.navigate("Home");
                            SuccesToaster(param, 'Welcome to My Wickets!');
                        }
                    } else {
                        dispatch(CommonActionsCreator.error(loginConstants.LOGIN_FAILURE, user))
                    }
                },
                error => {
                   
                    ErrorToaster(" Alert ", "Something went wrong !!!");                  
                }
            );
    };
}
/* ---- Social Login Function Ends ---- */