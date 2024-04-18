// @flow

import marthaApi from '../../../api/api';
import settingConstant from '../../../setting/Setting';
import {config} from '../../../api/config';

export const trackComplaintService = {
  viewComplaintList,
};

/*----- view comaplaint Services Start -----*/
function viewComplaintList(pdata) {
  const data = Object.assign({}, pdata);

  return marthaApi
    .post(
      `${settingConstant.api_url}${config.endpoint.trackComplaint}`,
      null,
      null,
      data,
    )
    .then(res => {
      return res;
    })
    .catch(error => {
      return Promise.reject(error);
    });
}

/*-----  view comaplaint Services End -----*/
