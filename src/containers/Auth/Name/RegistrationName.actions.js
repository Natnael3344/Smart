// @ flow



import {stopSubmit} from 'redux-form';
import {SuccesToaster, ErrorToaster} from '../../../helpers';
import {OTPConstants} from '../OTP/OTP.actions';
import * as RootNavigation from '../../../navigation/RootNavigation';
import {CommonActionsCreator} from '../../../actions/CommonActionCreators';
import { registrationNameService } from './RegistrationName.services';

export const registrationNameActions = {
  registrationName,
};

/* ---- Action Types ---- */

export const registrationNameConstants = {
  REGISTRATION_NAME_REQUEST: 'USERS_REGISTRATION_REQUEST',
  REGISTRATION_NAME_SUCCESS: 'USERS_REGISTRATION_SUCCESS',
  REGISTRATION_NAME_FAILURE: 'USERS_REGISTRATION_FAILURE',
};

/* ---- Registration Function Start ---- */
function registrationName(pdata) {
  return dispatch => {
    dispatch(
      CommonActionsCreator.fetching(registrationNameConstants.REGISTRATION_NAME_REQUEST),
    );

    registrationNameService.registrationName(pdata).then(
      user => {
        if (user.status_code === 200) {
          dispatch(
            CommonActionsCreator.success(
              registrationNameConstants.REGISTRATION_NAME_SUCCESS,
              user,
            ),
          );
          const successMessage = user.message;

          RootNavigation.navigate('dashboard');
          SuccesToaster({phonenumber: pdata.personal_mobile}, successMessage);
        } else {
          dispatch(
            CommonActionsCreator.error(
              registrationNameConstants.REGISTRATION_NAME_FAILURE,
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
          dispatch(stopSubmit('RegistrationName', validationErrors));
        }
      },
      error => {
        ErrorToaster(' Alert ', 'Something went wrong !!!');
      },
    );
  };
}
/* ---- Registration Function Ends ---- */
