// @flow 


import axios from 'axios';
import marthaApi from '../../../api/api';
import settingConstant from '../../../setting/Setting';
import { config } from '../../../api/config';
const API_URL = `${settingConstant.knowledgeBank_url}${config.endpoint.learningDocs}`;


export const fetchCards = () => {
    return axios.get(API_URL);
  };

/*-----  view comaplaint Services End -----*/