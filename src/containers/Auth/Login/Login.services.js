// @flow 

import marthaApi from '../../../api/api';
import settingConstant from '../../../setting/Setting';
import { config } from '../../../api/config';

export const loginService = {
    login
};


/*----- Login Services Start -----*/
function login(values) {
    
    const data = Object.assign({}, {
        "personal_mobile": values.username,   
    })
      
    return marthaApi.post(`${settingConstant.api_url}${config.endpoint.otpGenerate}`,null,null,data).then(res => {
        return res;
    }).catch(error => {
        return Promise.reject(error);
    })

}

/*----- Login Services End -----*/
