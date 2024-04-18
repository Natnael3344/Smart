// @flow 


import axios from 'axios';
import marthaApi from '../../../api/api';
import settingConstant from '../../../setting/Setting';
import { config } from '../../../api/config';


export const fetchCards = () => {
    // return axios.get(API_URL);

    return marthaApi.get(`${settingConstant.api_url}${config.endpoint.laws}`,null,null).then(res => {
      return res;
  }).catch(error => {
      return Promise.reject(error);
  })
};

/*-----  view comaplaint Services End -----*/