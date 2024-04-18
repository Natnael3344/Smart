// @ flow

import {registrationService} from './Registration.services';

import {stopSubmit} from 'redux-form';
import {SuccesToaster, ErrorToaster} from '../../../helpers';
import {OTPConstants} from '../OTP/OTP.actions';
import * as RootNavigation from '../../../navigation/RootNavigation';
import {CommonActionsCreator} from '../../../actions/CommonActionCreators';

export const registrationActions = {
  registration,
};

/* ---- Action Types ---- */

export const registrationConstants = {
  REGISTRATION_REQUEST: 'USERS_REGISTRATION_REQUEST',
  REGISTRATION_SUCCESS: 'USERS_REGISTRATION_SUCCESS',
  REGISTRATION_FAILURE: 'USERS_REGISTRATION_FAILURE',
};

/* ---- Registration Function Start ---- */
function registration(pdata) {
  return dispatch => {
    dispatch(
      CommonActionsCreator.fetching(registrationConstants.REGISTRATION_REQUEST),
    );

    registrationService.registration(pdata).then(
      user => {
        if (user.status_code === 200) {
          dispatch(
            CommonActionsCreator.success(
              registrationConstants.REGISTRATION_SUCCESS,
              user,
            ),
          );
          const successMessage = user.message;

          RootNavigation.navigate('Otp', pdata);
          SuccesToaster({phonenumber: pdata.personal_mobile}, successMessage);
        } else {
          dispatch(
            CommonActionsCreator.error(
              registrationConstants.REGISTRATION_FAILURE,
              user,
            ),
          );

          let msg = '';
          if (typeof user.message[0].msg != 'undefined') {
            msg = user.message[0].msg;
          } else {
            msg = user.message;
          }

          const validationErrors = {personal_mobile: msg};
          dispatch(stopSubmit('Registration', validationErrors));
        }
      },
      error => {
        ErrorToaster(' Alert ', 'Something went wrong !!!');
      },
    );
  };
}
/* ---- Registration Function Ends ---- */
