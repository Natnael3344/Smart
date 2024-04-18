// @ flow

import {fileComplaintService} from './FileComplaint.services';

import {stopSubmit} from 'redux-form';
import {SuccesToaster, ErrorToaster} from '../../../helpers';
import * as RootNavigation from '../../../navigation/RootNavigation';
import {CommonActionsCreator} from '../../../actions/CommonActionCreators';

export const fileComplaintActions = {
  submitFileComplaint,
  checkPincode,
  resetFileComplaint,
};

/* ---- Action Types ---- */

export const fileComplaintConstants = {
  FILECOMPLAINT_REQUEST: 'FILECOMPLAINT_REQUEST',
  FILECOMPLAINT_SUCCESS: 'FILECOMPLAINT_SUCCESS',
  FILECOMPLAINT_FAILURE: 'FILECOMPLAINT_FAILURE',
  FILECOMPLAINT_RESET_REQUEST:'FILECOMPLAINT_RESET_REQUEST',
  PINCODE_REQUEST: 'PINCODE_REQUEST',
  PINCODE_SUCCESS: 'PINCODE_SUCCESS',
  PINCODE_FAILURE: 'PINCODE_FAILURE',
};

/* ---- FileComplaint Function Start ---- */
function submitFileComplaint(pdata) {
  return dispatch => {
    dispatch(
      CommonActionsCreator.fetching(
        fileComplaintConstants.FILECOMPLAINT_REQUEST,
      ),
    );

    fileComplaintService.submitFileComplaint(pdata).then(
      user => {
        if (user.status_code === 200) {
          dispatch(
            CommonActionsCreator.success(
              fileComplaintConstants.FILECOMPLAINT_SUCCESS,
              user,
            ),
          );
          const successMessage = user.message;

          // RootNavigation.navigate("dashboard")
          //SuccesToaster({}, successMessage);
        } else {
          dispatch(
            CommonActionsCreator.error(
              fileComplaintConstants.FILECOMPLAINT_FAILURE,
              user,
            ),
          );

          let msg = '';
          if (typeof user.message[0].msg != 'undefined') {
            msg = user.message[0].msg;
          } else {
            msg = user.message;
          }

          const validationErrors = {perosnal_mobile: msg};

          ErrorToaster(' Alert ', msg);

          dispatch(stopSubmit('FileComplaint', validationErrors));
        }
      },
      error => {
        ErrorToaster(' Alert ', 'Something went wrong !!!');
      },
    );
  };
}
/* ---- FileComplaint Function Ends ---- */
/* ---- check PINCODE Function Ends ---- */
function checkPincode(pdata) {
  return dispatch => {
    dispatch(
      CommonActionsCreator.fetching(fileComplaintConstants.PINCODE_REQUEST),
    );

    fileComplaintService.checkPincode(pdata).then(
      user => {
        if (user.status_code === 200) {
          dispatch(
            CommonActionsCreator.success(
              fileComplaintConstants.PINCODE_SUCCESS,
              user,
            ),
          );
        } else {
          dispatch(
            CommonActionsCreator.error(
              fileComplaintConstants.PINCODE_FAILURE,
              user,
            ),
          );

          let msg = '';
          if (typeof user.message[0].msg != 'undefined') {
            msg = user.message[0].msg;
          } else {
            msg = user.message;
          }

          ErrorToaster(' Alert ', msg);
        }
      },
      error => {
        ErrorToaster(' Alert ', 'Something went wrong !!!');
      },
    );
  };
}

/* ---- reset FileComplaint Function Start ---- */
function resetFileComplaint() {
  return dispatch => {
    dispatch(
      CommonActionsCreator.fetching(
        fileComplaintConstants.FILECOMPLAINT_RESET_REQUEST,
      ),
    );
  };
}
