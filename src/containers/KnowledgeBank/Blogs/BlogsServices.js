// @flow 


import axios from 'axios';
import marthaApi from '../../../api/api';
import settingConstant from '../../../setting/Setting';
import { config } from '../../../api/config';
const API_URL = `${settingConstant.knowledgeBank_url}${config.endpoint.blogs}`;


export const fetchCards = () => {
  
    return marthaApi.get(`${settingConstant.api_url}${config.endpoint.blogs}`,null,null).then(res => {
        return res;
    }).catch(error => {
        return Promise.reject(error);
    })
  };

/*-----  view comaplaint Services End -----*/