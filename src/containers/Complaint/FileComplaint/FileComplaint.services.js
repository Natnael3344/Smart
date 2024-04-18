// @flow

import marthaApi from '../../../api/api';
import settingConstant from '../../../setting/Setting';
import {config} from '../../../api/config';

export const fileComplaintService = {
  submitFileComplaint,
  checkPincode,
};

/*----- File complaint Services Start -----*/
function submitFileComplaint(values) {
  return marthaApi
    .post(
      `${settingConstant.api_url}${config.endpoint.submitComplaint}`,
      {"Content-Type" : "multipart/form-data"},
      null,
      values,
    )
    .then(res => {
      return res;
    })
    .catch(error => {
      return Promise.reject(error);
    });
}

/*----- File Complaint Services End -----*/

/*----- checkPincode Services Start -----*/
function checkPincode(currCode) {
  return marthaApi
    .get(`${config.endpoint.checkPincode}${currCode}`, null, currCode)
    .then(res => {
      return res;
    })
    .catch(error => {
      return Promise.reject(error);
    });
}

/*----- checkPincode Services End -----*/
